import React from 'react';
import { ApolloConsumer, graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FIND_USER_QUERY,
  DELETE_PARTY_MUTATION,
  UPDATE_PARTY_MUTATION,
  UPDATE_PARTY_MEMBERS_MUTATION,
  PARTY_QUERY,
} from './queries';
import { CurrentUserContext } from '../../components/WithCurrentUser';
import PartyDetailPage from './PartyDetailPage';

class PartyDetailContainer extends React.Component {
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
    partyFormData: {
      name: '',
      location: '',
      achievements: '',
      notes: '',
      reputation: 0,
    },
    memberFormData: {
      email: '',
    },
    members: [],
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.partyQuery.Party) {
      return this.props.history.replace('/');
    }
    if (newProps !== this.props && !newProps.partyQuery.loading) {
      return this.setState({
        partyFormData: {
          name: newProps.partyQuery.Party.name,
          location: newProps.partyQuery.Party.location,
          notes: newProps.partyQuery.Party.notes,
          achievements: newProps.partyQuery.Party.achievements,
          reputation: newProps.partyQuery.Party.reputation,
        },
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

    const {
      location,
      name,
      notes,
      achievements,
      reputation,
    } = this.state.partyFormData;

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
      variables: { email: this.state.memberFormData.email },
    });

    if (!data.User) {
      return alert(`no user found with email address: ${this.state.memberFormData.email}`);
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
    return this.setState({ memberFormData: { email: '' } });
  }


  onInputChange = ({ formName, fieldName }) => e => (
    this.setState({
      [`${formName}FormData`]: {
        [fieldName]: e.target.value,
      },
    })
  )

  get partyId() {
    return this.props.partyQuery.Party.id;
  }

  isCurrentUserAdmin = userId => this.props.partyQuery.Party.admin.id === userId;

  handleDelete = async () => {
    await this.props.deletePartyMutation({ variables: { id: this.partyId } });
    this.props.history.replace('/');
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <CurrentUserContext.Consumer>
            {({ user, isUserLoading }) => {
              if (isUserLoading || this.props.partyQuery.loading) {
                return <span>Loading...</span>;
              }

              return (
                <PartyDetailPage
                  editMemberFormData={this.state.memberFormData}
                  editPartyFormData={this.state.partyFormData}
                  handleDelete={this.handleDelete}
                  isCurrentUserAdmin={this.isCurrentUserAdmin(user.id)}
                  isLoading={isUserLoading || this.props.partyQuery.loading}
                  members={this.state.members}
                  onInputChange={this.onInputChange}
                  onSubmitAddMemberForm={this.onSubmitAddMemberForm(client)}
                  onSubmitEditForm={this.onSubmitEditForm(user.id)}
                  Party={this.props.partyQuery.Party}
                />
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
)(PartyDetailContainer);

export default withRouter(DetailPageWithGraphQL);
