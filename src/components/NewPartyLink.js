import React from 'react';
import { Link } from 'react-router-dom';

export default class NewPartyLink extends React.Component {
  render() {
    return (
      <Link to="/party/create">
        + New Party
      </Link>
    );
  }
}
