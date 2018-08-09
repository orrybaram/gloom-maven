import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import errorMessageSanitizer from '../../lib/errorMessageSanitizer';
import { LOGGED_IN_USER_QUERY } from '../../shared/queries';
import Login from './Login';

class CreateLogin extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loggedInUser: PropTypes.shape({
        id: PropTypes.string,
      }),
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    authenticateUserMutation: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  onInputChange = fieldName => e => (
    this.setState({
      [fieldName]: e.target.value,
    })
  );

  authenticateUser = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await this.props.authenticateUserMutation({
        variables: { email, password },
      });
      localStorage.setItem('graphcoolToken', response.data.authenticateUser.token);

      await this.props.loggedInUserQuery.refetch();
      this.props.history.replace('/');
    } catch (err) {
      alert(errorMessageSanitizer(err.message));
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
        email={this.state.email}
        password={this.state.password}
        onInputChange={this.onInputChange}
        onFormSubmit={this.authenticateUser}
      />
    );
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;


export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(CreateLogin));
