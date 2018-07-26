import React from 'react';
import { ApolloConsumer, graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { CurrentUserContext } from './WithCurrentUser';

const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacterMutation($id: ID!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`;

const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacterMutation(
    $id: ID!,
    $name: String,
  ) {
    updateCharacter(
      id: $id,
      name: $name,
    ) {
      name
    }
  }
`;

const CHARACTER_QUERY = gql`
  query characterQuery($id: ID!) {
    Character(id: $id) {
      id
      achievements
      location
      name
      notes
      reputation
      members {
        id
        email
        name
      }
      admin {
        name
        id
      }
    }
  }
`;

class CharacterDetailPage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    deleteCharacterMutation: PropTypes.func.isRequired,
    updateCharacterMutation: PropTypes.func.isRequired,
    characterQuery: PropTypes.shape({
      refetch: PropTypes.func,
      loading: PropTypes.bool,
      Character: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    name: '',
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.characterQuery.Character) {
      return this.props.history.replace('/');
    }

    if (newProps !== this.props && !newProps.characterQuery.loading) {
      return this.setState({
        name: newProps.characterQuery.Character.name,
      });
    }
    return null;
  }

  onSubmitEditForm = userId => async (e) => {
    e.preventDefault();

    if (!this.isCurrentUserCharacterOwner(userId)) {
      console.warn('only character admins can make edits');
      return;
    }

    const { location, name, notes, achievements, reputation } = this.state;
    const adminId = userId;

    await this.props.updateCharacterMutation({
      variables: {
        id: this.characterId,
        name,
        location,
        adminId,
        notes,
        achievements,
        reputation: Number(reputation),
      },
    });

    this.props.characterQuery.refetch();
  }

  get characterId() {
    return this.props.characterQuery.Character.id;
  }

  isCurrentUserCharacterOwner = userId => this.props.characterQuery.Character.User.id === userId;

  handleDelete = async () => {
    await this.props.deleteCharacterMutation({ variables: { id: this.characterId } });
    this.props.history.replace('/');
  }

  render() {
    if (this.props.characterQuery.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    const { Character } = this.props.characterQuery;

    return (
      <ApolloConsumer>
        {client => (
          <CurrentUserContext.Consumer>
            {({ user, isUserLoading }) => {
              if (isUserLoading) {
                return <span>Loading...</span>;
              }

              return (
                <div>
                  <Link to="/">{'<-'} Back</Link>
                  <h1>
                    {Character.name}
                  </h1>
                  <h2>{Character.location}</h2>

                  {this.isCurrentUserCharacterOwner(user.id) && (
                    <div>
                      <h3>Admin:</h3>
                      <form onSubmit={this.onSubmitEditForm(user.id)}>
                        <input
                          value={this.state.name}
                          placeholder="Name"
                          onChange={e => this.setState({ name: e.target.value })}
                        />
                        <button type="submit">
                          Update
                        </button>
                      </form>

                      <hr />

                      <button type="button" onClick={this.handleDelete}>
                        delete
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          </CurrentUserContext.Consumer>
        )}
      </ApolloConsumer>
    );
  }
}

const DetailPageWithGraphQL = compose(
  graphql(CHARACTER_QUERY, {
    name: 'characterQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({ match }) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
  graphql(DELETE_CHARACTER_MUTATION, {
    name: 'deleteCharacterMutation',
  }),
  graphql(UPDATE_CHARACTER_MUTATION, {
    name: 'updateCharacterMutation',
  }),
)(CharacterDetailPage);

export default withRouter(DetailPageWithGraphQL);
