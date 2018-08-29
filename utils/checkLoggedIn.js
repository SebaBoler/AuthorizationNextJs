import gql from 'graphql-tag'

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query me {
        me {
          id
          email
          name
        }
      }
    `
  }).then(({ data }) => {
    console.log(data)
    return { loggedInUser: data }
  }).catch(() => {
    return { loggedInUser: {} }
  })
)
