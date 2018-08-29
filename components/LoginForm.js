import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../utils/redirect'
import jwt from 'jsonwebtoken'

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const LoginForm = ({ client }) => {
  let email, password

  return (
    <Mutation mutation={LOGIN} onCompleted={(data) => {
      const tokeInfo = jwt.decode(data.login.token)
      const ty = 30 * 24 * 60 
      document.cookie = cookie.serialize('token', data.login.token, {
          maxAge: ty
        // maxAge: 30 * 24 * 60 * 60 // 30 days
        // maxAge: tokenInfo.exp - tokenInfo.iat
      })
      client.cache.reset().then(() => {
        redirect({}, '/dashboard')
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
