import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { withRouter, Route, Switch } from 'react-router-dom';

import CreateParty from '../modules/CreateParty';
import CharacterDetail from '../modules/CharacterDetail';
import Dashboard from '../modules/Dashboard';
import PartyDetail from '../modules/PartyDetail';
import Header from '../modules/Header';
import Login from '../modules/Login';
import Signup from '../modules/Signup';

import Loading from './Loading';
import Main from './Main';
import { LOGGED_IN_USER_QUERY } from '../lib/queries';


class App extends React.Component {
  isLoggedIn = loggedInUser => loggedInUser && loggedInUser.id !== null;

  render() {
    return (
      <Query
        query={LOGGED_IN_USER_QUERY}
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <Loading />
            );
          }

          const isLoggedIn = this.isLoggedIn(data.loggedInUser);

          return (
            <Fragment>
              <Header isLoggedIn={isLoggedIn} />
              {isLoggedIn ? (
                <Main>
                  <Switch>
                    <Route path="/party/create" component={CreateParty} />
                    <Route path="/party/:id" component={PartyDetail} />
                    <Route path="/character/:id" component={CharacterDetail} />
                    <Route component={Dashboard} />
                  </Switch>
                </Main>
              ) : (
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route component={Login} />
                </Switch>
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(App);
