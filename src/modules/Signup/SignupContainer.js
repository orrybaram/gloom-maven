import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import errorMessageSanitizer from '../../lib/errorMessageSanitizer';
import { LOGGED_IN_USER_QUERY } from '../../lib/queries';
import Signup from './Signup';
import withDialogue from '../../lib/withDialogue';
import { withDialoguePropTypes } from '../../lib/propTypes';

class CreateUser extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loggedInUser: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      refetch: PropTypes.func,
      loading: PropTypes.bool,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    signupUserMutation: PropTypes.func.isRequired,
    ...withDialoguePropTypes,
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  onInputChange = fieldName => e => (
    this.setState({
      [fieldName]: e.target.value,
    })
  );

  signupUser = async (e) => {
    e.preventDefault();
    const { email, password, name } = this.state;

    try {
      const user = await this.props.signupUserMutation({ variables: { email, password, name } });
      localStorage.setItem('graphcoolToken', user.data.signupUser.token);
      await this.props.loggedInUserQuery.refetch();
      this.props.history.replace('/');
    } catch (err) {
      this.props.alert(errorMessageSanitizer(err.message));
    }
  }

  isButtonDisabled = () => !(this.state.name && this.state.email && this.state.password)

  render() {
    // redirect if user is logged in
    if (
      this.props.loggedInUserQuery.loggedInUser
      && this.props.loggedInUserQuery.loggedInUser.id
    ) {
      this.props.history.replace('/');
    }

    return (
      <Signup
        isLoading={this.props.loggedInUserQuery.loading}
        email={this.state.email}
        name={this.state.name}
        password={this.state.password}
        onInputChange={this.onInputChange}
        onFormSubmit={this.signupUser}
      />
    );
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation ($email: String!, $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
  }),
  withDialogue,
  withRouter,
)(CreateUser);
