import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Box } from 'grid-styled/emotion';

import { withCurrentUserPropTypes, withCurrentUserDefaultProps } from '../../lib/propTypes';
import withCurrentUser from '../../lib/withCurrentUser';
import { Button } from '../../components';

import * as S from './styles';

class HeaderUser extends React.Component {
  static propTypes = withCurrentUserPropTypes;

  static defaultProps = withCurrentUserDefaultProps;

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logout = () => {
    localStorage.removeItem('graphcoolToken');
    window.location.replace('/login');
  };

  render() {
    const { currentUser, isUserLoading } = this.props;

    return (
      isUserLoading ? (
        <div>Loading</div>
      ) : (
        <S.HeaderUser>
          Welcome,
          <Box ml={2} is="span">
            <Button type="button" onClick={this.handleOpen}>
              {currentUser.name}
            </Button>
          </Box>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll="body"
          >
            <Box m={3}>
              <h1>{currentUser.name}</h1>
              <h2>{currentUser.email}</h2>
              <Button
                onClick={this.logout}
                type="button"
                variant="contained"
              >
                Logout
              </Button>
            </Box>
          </Dialog>
        </S.HeaderUser>
      )
    )
  }
}

export default withCurrentUser(HeaderUser);
