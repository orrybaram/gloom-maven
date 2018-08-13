import styled from 'react-emotion';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiIcon from '@material-ui/core/Icon';

import { secondary, black } from '../../lib/theme';

export const Avatar = styled(MuiAvatar)`
  && {
    background-color: ${secondary};
    color: ${black};
    height: 50px;
    width: 50px;
  }
`;

export const PartyPanel = styled.div`
  background: #f1f1f1;
  height: 100%;
`;

export const AddPartyAvatar = styled(Avatar)`
  && {
    border: 1px dashed black;
    background: none;
  }
`;

export const Icon = styled(MuiIcon)`
  && {
    color: gray;
  }
`;
