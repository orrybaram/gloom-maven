import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { primary } from '../lib/theme';

const S = {};
S.Logo = styled.div`
  background: ${primary};
  margin: -10px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 800;
  transition: all 0.2s;
  width: 128px;

  &:hover {
    filter: brightness(1.1);
    a {
      transform: scale(1.05) rotate(-1deg);
    }
  }

  a {
    color: white;
    transition: all 0.2s;
    padding: 10px;
    display: flex;
  }
`;

export default () => (
  <S.Logo>
    <Link to="/">Gloommaven</Link>
  </S.Logo>
);
