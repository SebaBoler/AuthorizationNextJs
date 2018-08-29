import React from 'react'
import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'
import LoginForm from '../components/LoginForm'

export default class Login extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser.user) {
      // Already logged in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {}
  }

  render () {
    return (
      <React.Fragment>
        <LoginForm />
      </React.Fragment>
    )
  }
};
