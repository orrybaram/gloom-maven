import styled from 'react-emotion';
import { Box } from 'grid-styled/emotion';
import { withProps } from 'recompose';
import { gray } from '../lib/theme';

export default withProps({
  is: 'label',
})(styled(Box)`
  display: block;
`);

export const LabelText = styled(Box)`
  color: ${gray};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 10px;
`;
