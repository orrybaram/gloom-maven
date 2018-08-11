import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { withRouter, Route, Switch } from 'react-router-dom';

import CreateParty from '../modules/CreateParty';
import CharacterDetail from '../modules/CharacterDetail';
import Dashboard from '../modules/Dashboard';
import PartyDetail from '../modules/PartyDetail';

import Header from './Header';
import LoginPage from './LoginPage';
import Loading from './Loading';

import { LOGGED_IN_USER_QUERY } from '../lib/queries';

class App extends React.Component {
  isLoggedIn = loggedInUser => loggedInUser && loggedInUser.id !== null;

  render() {
    return (
      <Query
        query={LOGGED_IN_USER_QUERY}
        fetchPolicy="network-only"
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <Loading />
            );
          }

          if (!this.isLoggedIn(data.loggedInUser)) {
            return <LoginPage />;
          }

          return (
            <Fragment>
              <Header />

              <Switch>
                <Route path="/party/create" component={CreateParty} />
                <Route path="/party/:id" component={PartyDetail} />
                <Route path="/character/:id" component={CharacterDetail} />
                <Route component={Dashboard} />
              </Switch>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(App);
