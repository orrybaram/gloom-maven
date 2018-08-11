import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  CREATE_PARTY_MUTATION,
  CREATE_CHARACTER_MUTATION,
  CHARACTER_CLASS_QUERY,
} from '../queries';
import CreatePartyPage from './CreatePartyPage';
import withCurrentUser from '../../../lib/withCurrentUser';
import { withRouterPropsTypes } from '../../../lib/propTypes';

class CreatePartyContainer extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    createPartyMutation: PropTypes.func.isRequired,
    createCharacterMutation: PropTypes.func.isRequired,
    characterClassQuery: PropTypes.func.isRequired,
    ...withRouterPropsTypes,
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

    const { currentUser } = this.props;

    // redirect if no user is logged in
    if (!currentUser) {
      console.warn('only logged in users can create new parties');
      return;
    }

    const { location, imageUrl, name } = this.state;
    const adminId = currentUser.id;

    const { data: { createParty: { id: partyId } } } = await this.props.createPartyMutation({
      variables: {
        name, location, imageUrl, adminId,
      },
    });

    const characterClassIds = this.props.characterClassQuery.allCharacterClasses;

    characterClassIds.forEach(({ id: characterClassId }) => {
      this.props.createCharacterMutation({
        variables: {
          partyId,
          characterClassId,
        },
      });
    });

    this.props.history.replace(`/party/${partyId}`);
  }

  render() {
    return (
      <CreatePartyPage
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
  graphql(CREATE_CHARACTER_MUTATION, { name: 'createCharacterMutation' }),
  graphql(CHARACTER_CLASS_QUERY, { name: 'characterClassQuery' }),
  withRouter,
  withCurrentUser,
)(CreatePartyContainer);
