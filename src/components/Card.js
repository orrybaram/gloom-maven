import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled/emotion';
import styled from 'react-emotion';

const S = {};
S.Card = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2)
`;

const Card = ({ children }) => (
  <S.Card>
    <Box p="40px">
      {children}
    </Box>
  </S.Card>
);

Card.propTypes = { children: PropTypes.node.isRequired };

export default Card;
