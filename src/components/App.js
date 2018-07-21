import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import ListPage from './ListPage'
import NewPartyLink from './NewPartyLink'
import gql from 'graphql-tag'

class App extends React.Component {

  logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  showLogin = () => {
    this.props.history.replace('/login')
  }

  showSignup = () => {
    this.props.history.replace('/signup')
  }

  isLoggedIn = () => {
    return this.props.loggedInUserQuery.loggedInUser && this.props.loggedInUserQuery.loggedInUser.id !== null
  }

  render () {

    if (this.props.loggedInUserQuery.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    }

    return this.renderLoggedOut()
  }

  renderLoggedIn() {
    return (
      <div>
        <span>
          User ID: {this.props.loggedInUserQuery.loggedInUser.id}
        </span>
        <div className='pv3'>
          <span
            className='dib bg-red white pa3 pointer dim'
            onClick={this.logout}
          >
            Logout
          </span>
        </div>
        <ListPage />
        <NewPartyLink />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <div className='pv3'>
          <div className='w-100 pa4 flex justify-center'>
            <span
              onClick={this._showLogin}
              className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Email
            </span>
          </div>
          <div className='w-100 flex justify-center'>
            <span
              onClick={this._showSignup}
              className='dib pa3 white bg-blue dim pointer'
            >
              Sign up with Email
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: {fetchPolicy: 'network-only'}
})(withRouter(App))
