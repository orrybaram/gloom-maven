import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../../components';

import HeaderUser from './HeaderUser';
import * as S from './styles';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const Header = ({ isLoggedIn }) => (
  <S.Header>
    <Logo />
    {isLoggedIn && <HeaderUser />}
  </S.Header>
);

Header.propTypes = propTypes;
export default Header;
