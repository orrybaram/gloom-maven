import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import ListPage from './ListPage';
import NewPartyLink from './NewPartyLink';

const propTypes = {
  userId: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  background: red;
`;

const Dashboard = ({ userId }) => (
  <Wrapper>
    <ListPage userId={userId} />
    <NewPartyLink />
  </Wrapper>
);

Dashboard.propTypes = propTypes;
export default Dashboard;
