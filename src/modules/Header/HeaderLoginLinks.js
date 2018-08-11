import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';

const HeaderLoginLinks = styled.div`
  display: inline-flex;
`;

export default () => (
  <HeaderLoginLinks>
    <Link to="/login">
      Log in
    </Link>

    <Link to="/signup">
      Sign up
    </Link>
  </HeaderLoginLinks>
);
