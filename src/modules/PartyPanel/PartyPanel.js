import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Box, Flex } from 'grid-styled/emotion';

import { SmallText } from '../../components/utils';
import * as S from './styles';

const propTypes = {
  allParties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

const PartyPanel = ({ allParties }) => (
  <Flex alignItems="center" flexDirection="column" p={2}>
    <SmallText>Your Parties</SmallText>
    {allParties.map(party => (
      <Link key={party.id} to={`/party/${party.id}`}>
        <Tooltip placement="right" title={party.name}>
          <Box my={2}>
            <S.Avatar>
              {party.name.substring(0, 2)}
            </S.Avatar>
          </Box>
        </Tooltip>
      </Link>
    ))}
    <Link to="/party/create">
      <Tooltip placement="right" title="Create Party">
        <S.AddPartyAvatar>
          <S.Icon>add</S.Icon>
        </S.AddPartyAvatar>
      </Tooltip>
    </Link>
  </Flex>
);

PartyPanel.propTypes = propTypes;
export default PartyPanel;
