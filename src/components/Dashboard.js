import React from 'react';
import styled from 'react-emotion';
import ListPage from './ListPage';
import NewPartyLink from './NewPartyLink';
import { CurrentUserContext } from './WithCurrentUser';

const Wrapper = styled.div`
  background: #f1f1f1;
`;

const Dashboard = () => (
  <CurrentUserContext.Consumer>
    {({ user, isUserLoading }) => (
      <Wrapper>
        {!isUserLoading && (
          <div>
            <ListPage userId={user.id} />
            <NewPartyLink />
          </div>
        )}
      </Wrapper>
    )}

  </CurrentUserContext.Consumer>
);

export default Dashboard;
