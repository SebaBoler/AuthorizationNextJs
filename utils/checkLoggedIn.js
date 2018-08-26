import gql from 'graphql-tag'

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query user {
        user {
          id
          email
          name
        }
      }
    `
  }).then(({ data }) => {
    return { loggedInUser: data }
  }).catch(() => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
