import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import errorMessageSanitizer from '../../lib/errorMessageSanitizer';
import { LOGGED_IN_USER_QUERY } from '../../lib/queries';
import Login from './Login';
import { AUTHENTICATE_USER_MUTATION } from './queries';
import { withRouterPropTypes, withDialoguePropTypes } from '../../lib/propTypes';
import withDialogue from '../../lib/withDialogue';

class CreateLogin extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loggedInUser: PropTypes.shape({
        id: PropTypes.string,
      }),
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }).isRequired,
    authenticateUserMutation: PropTypes.func.isRequired,
    ...withRouterPropTypes,
    ...withDialoguePropTypes,
  }

  state = {
    email: '',
    password: '',
    isLoggingIn: false,
  }

  onInputChange = fieldName => e => (
    this.setState({
      [fieldName]: e.target.value,
    })
  );

  authenticateUser = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({
      isLoggingIn: true,
    });

    try {
      const response = await this.props.authenticateUserMutation({
        variables: { email, password },
      });
      localStorage.setItem('graphcoolToken', response.data.authenticateUser.token);

      await this.props.loggedInUserQuery.refetch();
      this.props.history.replace('/');
    } catch (err) {
      this.props.alert(errorMessageSanitizer(err.message));
    }
  }

  render() {
    // redirect if user is logged in
    if (
      this.props.loggedInUserQuery.loggedInUser
      && this.props.loggedInUserQuery.loggedInUser.id
    ) {
      this.props.history.replace('/');
    }

    return (
      <Login
        isLoading={this.props.loggedInUserQuery.loading}
        isLoggingIn={this.state.isLoggingIn}
        email={this.state.email}
        password={this.state.password}
        onInputChange={this.onInputChange}
        onFormSubmit={this.authenticateUser}
      />
    );
  }
}

export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
  }),
  withRouter,
  withDialogue,
)(CreateLogin);
