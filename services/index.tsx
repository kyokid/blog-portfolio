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

export const getSimilarPosts = async (category, slug) => {
    const query = gql`
        query GetPostDetails($categories: [String!], $slug: String!) {
            posts(
                where: {
                    categories_some: {
                        slug_in: $categories                    },
                    slug_not: $slug
                }
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
        category,
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