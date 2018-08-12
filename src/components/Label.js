import styled from 'react-emotion';
import { gray } from '../lib/theme';

export default styled.label`
  display: block;
`;

export const LabelText = styled.div`
  color: ${gray};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 10px;
`;
