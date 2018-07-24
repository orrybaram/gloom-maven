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
  mutation UpdatePartyMutation($id: ID!, $location: String, $name: String, $membersIds: [ID!]) {
    updateParty(id: $id, name: $name, location: $location, membersIds: $membersIds) {
      name
      location
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
      name
      location
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
        }),
        location: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    name: '',
    location: '',
    members: [],
    tempAddMemberEmail: '',
  };

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props && !newProps.partyQuery.loading) {
      this.setState({
        name: newProps.partyQuery.Party.name,
        location: newProps.partyQuery.Party.location,
        members: [...newProps.partyQuery.Party.members],
      });
    }
  }

  onSubmitEditForm = userId => async (e) => {
    e.preventDefault();

    if (!this.isCurrentUserAdmin(userId)) {
      console.warn('only party admins can make edits');
      return;
    }

    const { location, name } = this.state;
    const adminId = userId;

    await this.props.updatePartyMutation({
      variables: {
        id: this.partyId, name, location, adminId,
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
                    {Party.admin.name}
                  </div>

                  {this.isCurrentUserAdmin(user.id) && (
                    <div>
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

// const DetailPageWithDelete = graphql(DELETE_PARTY_MUTATION)(DetailPageWithGraphQL);
export default withRouter(DetailPageWithGraphQL);
