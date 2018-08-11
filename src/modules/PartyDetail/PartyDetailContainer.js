import React from 'react';
import { ApolloConsumer, graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FIND_USER_QUERY,
  DELETE_PARTY_MUTATION,
  DELETE_CHARACTER_MUTATION,
  UPDATE_PARTY_MUTATION,
  UPDATE_PARTY_MEMBERS_MUTATION,
  PARTY_QUERY,
} from './queries';
import PartyDetailPage from './PartyDetailPage';
import withCurrentUser from '../../lib/withCurrentUser';
import {
  withCurrentUserPropTypes,
  withRouterPropTypes,
  withDialoguePropTypes,
} from '../../lib/propTypes';
import withDialogue from '../../lib/withDialogue';
import Loading from '../../components/Loading';

class PartyDetailContainer extends React.Component {
  static propTypes = {
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
        characters: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
        })),
      }),
    }).isRequired,
    ...withRouterPropTypes,
    ...withCurrentUserPropTypes,
    ...withDialoguePropTypes,
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
    isDeleting: false,
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
      return this.props.alert(`no user found with email address: ${this.state.memberFormData.email}`);
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
    const confirmation = this.props.confirm('are you sure you wanna do this?');
    if (!confirmation) return;

    this.setState({
      isDeleting: true,
    });

    // delete all characters associated with party
    await Promise.all(this.props.partyQuery.Party.characters.map(({ id }) => (
      this.props.deleteCharacterMutation({ variables: { id } })
    )));

    // delete party
    await this.props.deletePartyMutation({ variables: { id: this.partyId } });
    this.props.history.replace('/');
  }

  render() {
    const { currentUser, isUserLoading } = this.props;

    return (
      <ApolloConsumer>
        {(client) => {
          if (isUserLoading || this.props.partyQuery.loading) {
            return <Loading />;
          }

          return (
            <PartyDetailPage
              editMemberFormData={this.state.memberFormData}
              editPartyFormData={this.state.partyFormData}
              handleDelete={this.handleDelete}
              isCurrentUserAdmin={this.isCurrentUserAdmin(currentUser.id)}
              isDeleting={this.state.isDeleting}
              isLoading={isUserLoading || this.props.partyQuery.loading}
              members={this.state.members}
              onInputChange={this.onInputChange}
              onSubmitAddMemberForm={this.onSubmitAddMemberForm(client)}
              onSubmitEditForm={this.onSubmitEditForm(currentUser.id)}
              Party={this.props.partyQuery.Party}
            />
          );
        }}
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
  graphql(DELETE_CHARACTER_MUTATION, {
    name: 'deleteCharacterMutation',
  }),
  graphql(UPDATE_PARTY_MUTATION, {
    name: 'updatePartyMutation',
  }),
  graphql(UPDATE_PARTY_MEMBERS_MUTATION, {
    name: 'updatePartyMembersMutation',
  }),
  withRouter,
  withCurrentUser,
  withDialogue,
)(PartyDetailContainer);

export default DetailPageWithGraphQL;
