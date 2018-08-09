import React from 'react';
import PropTypes from 'prop-types';

export default class CreateParty extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          Loading
        </div>
      );
    }

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
            Create
          </button>
        </form>

      </div>
    );
  }
}
