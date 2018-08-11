import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderUser from './HeaderUser';
import HeaderLoginLinks from './HeaderLoginLinks';

import * as S from './styles';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const Header = ({ isLoggedIn }) => (
  <S.Header>
    <Link to="/">Home</Link>

    {isLoggedIn
      ? <HeaderUser />
      : <HeaderLoginLinks />
    }
  </S.Header>
);


Header.propTypes = propTypes;
export default Header;
