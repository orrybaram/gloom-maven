import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grid-styled/emotion';

import {
  Button,
  Label,
  LabelText,
  Input,
} from '../../components';

export default class CreatePartyPage extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <h1>Create new party</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Label>
            <LabelText>Name</LabelText>
            <Input
              value={this.props.name}
              placeholder="Name"
              onChange={this.props.onInputChange('name')}
            />
          </Label>

          <Box mt={3}>
            <Button variant="contained" type="submit">
              {this.props.isCreating ? 'Creating...' : 'Create'}
            </Button>
          </Box>
        </form>
      </div>
    );
  }
}
