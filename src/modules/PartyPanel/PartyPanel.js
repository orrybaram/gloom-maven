import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { Flex } from 'grid-styled/emotion';

import PartyList from './PartyList';
import withCurrentUser from '../../lib/withCurrentUser';
import { withCurrentUserPropTypes } from '../../lib/propTypes';

const S = {};
S.PartyPanel = styled.div`
  background: #f1f1f1;
  height: 100%;
`;

S.AddPartyAvatar = styled(Avatar)`
  border: 1px dashed black;
  background: none;
  height: 50px;
  width: 50px;
`;

S.Icon = styled(Icon)`
  color: gray;
`;

const propTypes = withCurrentUserPropTypes;

const PartyPanel = ({ currentUser, isUserLoading }) => (
  <S.PartyPanel>
    {!isUserLoading && (
      <Flex alignItems="center" flexDirection="column" p={2}>
        <PartyList userId={currentUser.id} />
        <Link to="/party/create">
          <Tooltip placement="right" title="Create Party">
            <S.AddPartyAvatar>
              <S.Icon>add</S.Icon>
            </S.AddPartyAvatar>
          </Tooltip>
        </Link>
      </Flex>
    )}
  </S.PartyPanel>
);

PartyPanel.propTypes = propTypes;
export default withCurrentUser(PartyPanel);
