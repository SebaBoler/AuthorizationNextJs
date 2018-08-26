import React from 'react'
import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

import LogininForm from '../components/LogininForm'

export default class Signin extends React.Component {
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
        <LogininForm />
      </React.Fragment>
    )
  }
};
