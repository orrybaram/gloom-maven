import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import PartyList from './PartyList';
import withCurrentUser from '../../lib/withCurrentUser';
import { withCurrentUserPropTypes } from '../../lib/propTypes';

const Wrapper = styled.div`
  background: #f1f1f1;
`;

const propTypes = withCurrentUserPropTypes;

const Dashboard = ({ currentUser, isUserLoading }) => (
  <Wrapper>
    {!isUserLoading && (
      <div>
        <PartyList userId={currentUser.id} />
        <Link to="/party/create">
          + New Party
        </Link>
      </div>
    )}
  </Wrapper>
);

Dashboard.propTypes = propTypes;
export default withCurrentUser(Dashboard);
