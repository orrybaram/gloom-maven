import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Header from './Header';
import LoginPage from './LoginPage';
import CreateParty from './CreateParty';
import Dashboard from './Dashboard';
import WithCurrentUser from './WithCurrentUser';
import PartyDetailPage from './PartyDetailPage';

class App extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loggedInUser: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      refetch: PropTypes.func,
      loading: PropTypes.bool,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  }

  isLoggedIn = () => (
    this.props.loggedInUserQuery.loggedInUser
    && this.props.loggedInUserQuery.loggedInUser.id !== null
  )

  render() {
    const { loggedInUserQuery } = this.props;

    if (loggedInUserQuery.loading) {
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
      <WithCurrentUser userId={loggedInUserQuery.loggedInUser.id}>
        <div>
          <Header />

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
    }
  }
`;

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: { fetchPolicy: 'network-only' },
})(withRouter(App));
