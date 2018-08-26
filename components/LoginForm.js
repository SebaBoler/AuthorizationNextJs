import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../utils/redirect'

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const LoginForm = ({ client }) => {
  let email, password

  return (
    <Mutation mutation={LOGIN} onCompleted={(data) => {
      console.log(data)
      document.cookie = cookie.serialize('token', data.login.token, {
        maxAge: 30 * 24 * 60 * 60 // 30 days
      })
      client.cache.reset().then(() => {
        redirect({}, '/')
      })
    }} onError={(error) => {
      console.log(error)
    }}>
      {(login, { data, error }) => (
        <form onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          login({
            variables: {
              email: email.value,
              password: password.value
            }
          })

          email.value = password.value = ''
        }}>
          { error }
          <input name='email' placeholder='Email' ref={node => { email = node }} /><br />
          <input name='password' placeholder='Password' ref={node => { password = node }} type='password' /><br />
          <button>Login</button>
        </form>
      )}
    </Mutation>
  )
}

export default withApollo(LoginForm)
