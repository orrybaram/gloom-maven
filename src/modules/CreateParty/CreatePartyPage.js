import React from 'react';
import PropTypes from 'prop-types';

export default class CreatePartyPage extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input
            value={this.props.name}
            placeholder="Name"
            onChange={this.props.onInputChange('name')}
          />
          <input
            value={this.props.location}
            placeholder="Location"
            onChange={this.props.onInputChange('location')}
          />

          <button type="submit">
            {this.props.isCreating ? 'Creating...' : 'Create'}
          </button>
        </form>

      </div>
    );
  }
}
