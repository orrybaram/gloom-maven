import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import { Card } from '../../components';

export default class CharacterDetailModal extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    race: PropTypes.string.isRequired,
    information: PropTypes.string.isRequired,
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <Icon onClick={this.handleOpen}>info</Icon>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll="body"
        >
          <Card>
            <h2>
              {this.props.race} {this.props.className}
            </h2>
            <p>{this.props.information}</p>
          </Card>
        </Dialog>
      </React.Fragment>
    );
  }
}
