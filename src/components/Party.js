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
      <div className="pa3 bg-black-05 ma3">
        <Link to={`/parties/${this.props.party.id}`}>
          <div
            className="w-100"
          />
          <div className="pt3">
            {this.props.party.name}
          </div>
        </Link>
      </div>
    );
  }
}
