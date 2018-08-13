import styled from 'react-emotion';
import { darkBlack, gray } from '../../lib/theme';

export const Header = styled.header`
  background: linear-gradient(to right, #415461, ${darkBlack});
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  color: ${gray};
  font-size: 12px;
`;
