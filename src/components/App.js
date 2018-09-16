import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Flex, Box } from 'grid-styled/emotion';

import CreateParty from '../modules/CreateParty';
import CharacterDetail from '../modules/CharacterDetail';
import PartyPanel from '../modules/PartyPanel';
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
                <Flex>
                  <Box width={['60px', '128px']}>
                    <PartyPanel />
                  </Box>
                  <Box width={['calc(100% - 60px)', 'calc(100% - 128px)']}>
                    <Main>
                      <Switch>
                        <Route path="/party/create" component={CreateParty} />
                        <Route path="/party/:id" component={PartyDetail} />
                        <Route path="/character/:id" component={CharacterDetail} />
                        <Route component={() => (<div>hello!</div>)} />
                      </Switch>
                    </Main>
                  </Box>
                </Flex>
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
