import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { CREATE_PARTY_MUTATION } from '../queries';
import { LOGGED_IN_USER_QUERY } from '../../../shared/queries';
import CreateParty from './CreateParty';

class CreatePartyContainer extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loggedInUser: PropTypes.shape({
        id: PropTypes.string,
      }),
      loading: PropTypes.bool,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    createPartyMutation: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    location: 'Gloomhaven',
  }

  onInputChange = fieldName => (e) => {
    this.setState({
      [fieldName]: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    // redirect if no user is logged in
    if (!this.props.loggedInUserQuery.loggedInUser) {
      console.warn('only logged in users can create new parties');
      return;
    }

    const { location, imageUrl, name } = this.state;
    const adminId = this.props.loggedInUserQuery.loggedInUser.id;

    const { data: { createParty: { id } } } = await this.props.createPartyMutation({
      variables: {
        name, location, imageUrl, adminId,
      },
    });
    this.props.history.replace(`/party/${id}`);
  }

  render() {
    return (
      <CreateParty
        isLoading={this.props.loggedInUserQuery.loading}
        handleSubmit={this.handleSubmit}
        name={this.state.name}
        location={this.state.location}
        onInputChange={this.onInputChange}
      />
    );
  }
}

export default compose(
  graphql(CREATE_PARTY_MUTATION, { name: 'createPartyMutation' }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(CreatePartyContainer));
