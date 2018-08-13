import styled from 'react-emotion';
import { darken } from 'polished';
import { primary } from '../lib/theme';

export default styled.button`
  border: 0;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: ${primary};
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 2px;
  border-bottom: 2px solid ${darken(0.2, primary)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);

  &:hover {
    filter: brightness(1.1);
  }
`;
