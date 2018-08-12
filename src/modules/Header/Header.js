import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../../components';

import HeaderUser from './HeaderUser';
import HeaderLoginLinks from './HeaderLoginLinks';
import * as S from './styles';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const Header = ({ isLoggedIn }) => (
  <S.Header>
    <Logo />

    {isLoggedIn
      ? <HeaderUser />
      : <HeaderLoginLinks />
    }
  </S.Header>
);


Header.propTypes = propTypes;
export default Header;
