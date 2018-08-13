import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  CREATE_PARTY_MUTATION,
  CREATE_CHARACTER_MUTATION,
  CHARACTER_CLASS_QUERY,
} from './queries';
import CreatePartyPage from './CreatePartyPage';
import withCurrentUser from '../../lib/withCurrentUser';
import { withRouterPropTypes } from '../../lib/propTypes';

class CreatePartyContainer extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    createPartyMutation: PropTypes.func.isRequired,
    createCharacterMutation: PropTypes.func.isRequired,
    ...withRouterPropTypes,
  }

  state = {
    name: '',
    location: 'Gloomhaven',
    isCreating: false,
  }

  onInputChange = fieldName => (e) => {
    this.setState({
      [fieldName]: e.target.value,
    });
  }

  handleSubmit = characterClassIds => async (e) => {
    e.preventDefault();
    const { currentUser } = this.props;
    const { location, name } = this.state;

    // redirect if no user is logged in
    if (!currentUser) {
      console.warn('only logged in users can create new parties');
      return;
    }

    this.setState({
      isCreating: true,
    });

    const adminId = currentUser.id;
    const { data: { createParty: { id: partyId } } } = await this.props.createPartyMutation({
      variables: {
        name, location, adminId,
      },
    });

    await Promise.all(characterClassIds.map(({ id: characterClassId }) => (
      this.props.createCharacterMutation({
        variables: {
          partyId,
          characterClassId,
        },
      })
    )));

    this.props.history.replace(`/party/${partyId}`);
  }

  render() {
    return (
      <Query query={CHARACTER_CLASS_QUERY}>
        {({ data }) => (
          <CreatePartyPage
            handleSubmit={this.handleSubmit(data.allCharacterClasses)}
            name={this.state.name}
            onInputChange={this.onInputChange}
            isCreating={this.state.isCreating}
          />
        )}
      </Query>
    );
  }
}

export default compose(
  graphql(CREATE_PARTY_MUTATION, { name: 'createPartyMutation' }),
  graphql(CREATE_CHARACTER_MUTATION, { name: 'createCharacterMutation' }),
  withRouter,
  withCurrentUser,
)(CreatePartyContainer);
