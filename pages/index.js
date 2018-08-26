import React from 'react'
import cookie from 'cookie'
import { ApolloConsumer } from 'react-apollo'
import redirect from '../utils/redirect'
import checkLoggedIn from '../utils/checkLoggedIn'

export default class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser.user) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/loginin')
    }

    return { loggedInUser }
  }

  signout = apolloClient => () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })
    apolloClient.cache.reset().then(() => {
      redirect({}, '/loginin')
    })
  }

  render () {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            Hello {this.props.loggedInUser.user.name}!<br />
            <button onClick={this.signout(client)}>Logout</button>
          </div>
        )}
      </ApolloConsumer>
    )
  }
};
