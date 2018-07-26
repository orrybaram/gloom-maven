import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Party extends React.Component {
  static propTypes = {
    party: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }

  render() {
    return (
      <Link to={`/party/${this.props.party.id}`}>
        {this.props.party.name}
      </Link>
    );
  }
}
