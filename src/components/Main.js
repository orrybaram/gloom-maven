import styled from 'react-emotion';
import { Box } from 'grid-styled/emotion';
import { withProps } from 'recompose';
import { background } from '../lib/theme';

export default withProps({
  p: [4, 5],
})(styled(Box)`
  background: ${background};
  height: 100vh;
  overflow: auto;
`);
