import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading';

export default class Signup extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  isButtonDisabled = () => !(this.props.name && this.props.email && this.props.password)

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <form onSubmit={this.props.onFormSubmit}>
        <input
          value={this.props.email}
          type="email"
          placeholder="Email"
          onChange={this.props.onInputChange('email')}
        />
        <input
          value={this.props.name}
          placeholder="Name"
          onChange={this.props.onInputChange('name')}
        />
        <input
          type="password"
          value={this.props.password}
          placeholder="Password"
          onChange={this.props.onInputChange('password')}
        />
        <button
          type="submit"
          disabled={this.isButtonDisabled()}
        >
          Sign up
        </button>
      </form>
    );
  }
}
