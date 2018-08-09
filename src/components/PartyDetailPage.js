import React from 'react';
import { ApolloConsumer, graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { CurrentUserContext } from './WithCurrentUser';

const FIND_USER_QUERY = gql`
  query findUserQuery($email: String!) {
    User(email: $email) {
      id
    }
  }
`;

const DELETE_PARTY_MUTATION = gql`
  mutation DeletePartyMutation($id: ID!) {
    deleteParty(id: $id) {
      id
    }
  }
`;

const UPDATE_PARTY_MUTATION = gql`
  mutation UpdatePartyMutation(
    $id: ID!,
    $achievements: String,
    $location: String,
    $name: String,
    $notes: String,
    $reputation: Int,
  ) {
    updateParty(
      id: $id,
      achievements: $achievements,
      location: $location,
      name: $name,
      notes: $notes,
      reputation: $reputation,
    ) {
      achievements
      location
      name
      notes
      reputation
    }
  }
`;

const UPDATE_PARTY_MEMBERS_MUTATION = gql`
  mutation UpdatePartyMemberMutation($joinedPartiesPartyId: ID!, $membersUserId: ID!) {
    addToUserJoinedParties(joinedPartiesPartyId: $joinedPartiesPartyId, membersUserId: $membersUserId) {
      membersUser {
        id
        email
        name
      }
    }
  }
`;

const PARTY_QUERY = gql`
  query partyQuery($id: ID!) {
    Party(id: $id) {
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
        email
      }
      characters {
        id
        characterClass {
          className
          information
          race
        }
        name
        gold
        xp
      }
    }
  }
`;

class PartyDetailPage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    deletePartyMutation: PropTypes.func.isRequired,
    updatePartyMutation: PropTypes.func.isRequired,
    updatePartyMembersMutation: PropTypes.func.isRequired,
    partyQuery: PropTypes.shape({
      refetch: PropTypes.func,
      loading: PropTypes.bool,
      Party: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        admin: PropTypes.shape({
          id: PropTypes.string,
          email: PropTypes.string,
        }),
        location: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    name: '',
    location: '',
    achievements: '',
    notes: '',
    reputation: 0,
    members: [],
    tempAddMemberEmail: '',
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.partyQuery.Party) {
      return this.props.history.replace('/');
    }
    if (newProps !== this.props && !newProps.partyQuery.loading) {
      return this.setState({
        name: newProps.partyQuery.Party.name,
        location: newProps.partyQuery.Party.location,
        notes: newProps.partyQuery.Party.notes,
        achievements: newProps.partyQuery.Party.achievements,
        reputation: newProps.partyQuery.Party.reputation,
        members: [...newProps.partyQuery.Party.members],
      });
    }
    return null;
  }

  onSubmitEditForm = userId => async (e) => {
    e.preventDefault();

    if (!this.isCurrentUserAdmin(userId)) {
      console.warn('only party admins can make edits');
      return;
    }

    const { location, name, notes, achievements, reputation } = this.state;
    const adminId = userId;

    await this.props.updatePartyMutation({
      variables: {
        id: this.partyId,
        name,
        location,
        adminId,
        notes,
        achievements,
        reputation: Number(reputation),
      },
    });

    this.props.partyQuery.refetch();
  }

  onSubmitAddMemberForm = apolloClient => async (e) => {
    e.preventDefault();

    const { data } = await apolloClient.query({
      query: FIND_USER_QUERY,
      variables: { email: this.state.tempAddMemberEmail },
    });

    if (!data.User) {
      return alert(`no user found with email address: ${this.state.tempAddMemberEmail}`);
    }

    const {
      data: {
        addToUserJoinedParties: {
          membersUser,
        },
      },
    } = await this.props.updatePartyMembersMutation({
      variables: {
        joinedPartiesPartyId: this.partyId,
        membersUserId: data.User.id,
      },
    });

    this.state.members.push(membersUser);
    return this.setState({ tempAddMemberEmail: '' });
  }

  get partyId() {
    return this.props.partyQuery.Party.id;
  }

  isCurrentUserAdmin = userId => this.props.partyQuery.Party.admin.id === userId;

  handleDelete = async () => {
    await this.props.deletePartyMutation({ variables: { id: this.partyId } });
    this.props.history.replace('/');
  }

  render() {
    if (this.props.partyQuery.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    const { Party } = this.props.partyQuery;

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
                    {Party.name}
                  </h1>
                  <h2>{Party.location}</h2>

                  <div>
                    admin:
                    {Party.admin.name} {Party.admin.email}
                  </div>

                  <div>
                    notes:
                    {Party.notes}
                  </div>

                  <div>
                    reputation:
                    {Party.reputation}
                  </div>

                  <div>
                    achievements:
                    {Party.achievements}
                  </div>

                  <div>
                    characters:
                    {Party.characters.map(character => (
                      <div>
                        {character.characterClass.race} - {character.characterClass.className}
                      </div>
                    ))}
                  </div>

                  {this.isCurrentUserAdmin(user.id) && (
                    <div>
                      <h3>Admin:</h3>
                      <form onSubmit={this.onSubmitEditForm(user.id)}>
                        <input
                          value={this.state.name}
                          placeholder="Name"
                          onChange={e => this.setState({ name: e.target.value })}
                        />
                        <input
                          value={this.state.location}
                          placeholder="Location"
                          onChange={e => this.setState({ location: e.target.value })}
                        />
                        <textarea
                          value={this.state.notes}
                          placeholder="Notes"
                          onChange={e => this.setState({ notes: e.target.value })}
                        />
                        <input
                          value={this.state.reputation}
                          placeholder="Reputation"
                          onChange={e => this.setState({ reputation: e.target.value })}
                        />
                        <textarea
                          value={this.state.achievements}
                          placeholder="Achievements"
                          onChange={e => this.setState({ achievements: e.target.value })}
                        />

                        <button type="submit">
                          Update
                        </button>
                      </form>

                      <hr />

                      <ul>
                        {this.state.members.map(member => (
                          <li key={member.email}><strong>{member.name}</strong> {member.email}</li>
                        ))}
                      </ul>

                      <form onSubmit={this.onSubmitAddMemberForm(client)}>
                        <input
                          placeholder="Add member by email"
                          value={this.state.tempAddMemberEmail}
                          onChange={e => this.setState({ tempAddMemberEmail: e.target.value })}
                        />
                        <button type="submit">Add</button>
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
  graphql(PARTY_QUERY, {
    name: 'partyQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({ match }) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
  graphql(DELETE_PARTY_MUTATION, {
    name: 'deletePartyMutation',
  }),
  graphql(UPDATE_PARTY_MUTATION, {
    name: 'updatePartyMutation',
  }),
  graphql(UPDATE_PARTY_MEMBERS_MUTATION, {
    name: 'updatePartyMembersMutation',
  }),
)(PartyDetailPage);

export default withRouter(DetailPageWithGraphQL);
