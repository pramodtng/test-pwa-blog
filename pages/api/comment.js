import { GraphQLClient, gql } from 'graphql-request';

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const token = process.env.NEXT_TOKEN

export default async function comment(req, res) {
  const graphQLClient = new GraphQLClient(graphqlApi, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `

  try {
    console.log(JSON.stringify(req.body))
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  }
  catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}