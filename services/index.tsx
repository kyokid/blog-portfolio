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