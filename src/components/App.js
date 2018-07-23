import React from 'react';
import { graphql, Query } from 'react-apollo';
import { withRouter, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';
import CreateParty from './CreateParty';
import Dashboard from './Dashboard';
import WithCurrentUser from './WithCurrentUser';
import PartyDetailPage from './PartyDetailPage';

const GET_CURRENT_USER = gql`
  query User($userId: ID!) {
    User(id: $userId) {
      id
      name
      email
    }
  }
`;

class App extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loggedInUser: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      loading: PropTypes.bool,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  }

  logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken');
    window.location.reload();
  }

  isLoggedIn = () => (
    this.props.loggedInUserQuery.loggedInUser
    && this.props.loggedInUserQuery.loggedInUser.id !== null
  )

  render() {
    if (this.props.loggedInUserQuery.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    if (!this.isLoggedIn()) {
      return <LoginPage />;
    }

    return (
      <WithCurrentUser userId={this.props.loggedInUserQuery.loggedInUser.id}>
        <div>
          <div>
            <button
              className="dib bg-red white pa3 pointer dim"
              onClick={this.logout}
              type="button"
            >
              Logout
            </button>
          </div>

          <Route path="/parties/:id" component={PartyDetailPage} />
          <Route path="/create" component={CreateParty} />
          <Route exact path={this.props.match.url} component={Dashboard} />
        </div>
      </WithCurrentUser>
    );
  }
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      name
    }
  }
`;

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: { fetchPolicy: 'network-only' },
})(withRouter(App));
