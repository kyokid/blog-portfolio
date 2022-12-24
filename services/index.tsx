import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                id
                authors {
                    ... on Author {
                    id
                    name
                    bio
                    photo {
                        url
                    }
                    }
                }
                createdAt
                excerpt
                title
                featuredImage {
                    url
                }
                slug
                categories {
                    name
                    slug
                }
                }
            }
            }
        }
    `

    const result = await request(graphqlAPI!, query)

    return result.postsConnection.edges
}

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                slug
                featuredImage {
                    url
                }
                createdAt
            }
        }
    `

    const result = await request(graphqlAPI!, query)

    return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($categories: [String!], $slug: String!) {
            posts(
            where: {
                categories_some: {
                slug_in: $categories
                },
                slug_not: $slug
            },
            last: 3
            ) {
            title
            slug
            featuredImage {
                url
            }
            createdAt
            }
        }      
    `

    const variables = {
        categories,
        slug
    }

    const result = await request(graphqlAPI!, query, variables)

    return result.posts
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI!, query)

    return result.categories
}

export const getPostDetails = async (slug) => {
    const query = gql`
    query GetPostDetails($slug: String!) {
        posts(where: { slug: $slug }) {
          id
          authors {
            ... on Author {
              id
              name
              bio
              photo {
                url
              }
            }
          }
          createdAt
          excerpt
          title
          featuredImage {
            url
          }
          slug
          categories {
            name
            slug
          }
          content {
            raw
          }
        }
      }      
    `

    const result = await request(graphqlAPI!, query, { slug })
    return result.posts[0]
}

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    return result.json()
}

export const getComments = async (slug) => {
    const query = gql`
    query GetComments($slug: String!) {
        comments(where: { post: { slug: $slug }}) {
            name
            comment
            createdAt
        }
    }
    `

    const result = await request(graphqlAPI!, query, { slug })
    return result.comments
}