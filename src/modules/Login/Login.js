import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../../components/Loading';

export default class Login extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <form onSubmit={this.props.onFormSubmit}>
        <input
          value={this.props.email}
          placeholder="Email"
          type="email"
          onChange={this.props.onInputChange('email')}
        />
        <input
          type="password"
          value={this.props.password}
          placeholder="Password"
          onChange={this.props.onInputChange('password')}
        />

        <button type="submit">
          {this.props.isLoggingIn ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    );
  }
}
