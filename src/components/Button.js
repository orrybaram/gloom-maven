import styled from 'react-emotion';
import { primary } from '../lib/theme';

export default styled.button`
  border: 0;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: ${primary};
  color: white;
`;
