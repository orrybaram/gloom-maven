import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { CurrentUserContext } from './WithCurrentUser';

class PartyDetailPage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    deletePartyMutation: PropTypes.func.isRequired,
    updatePartyMutation: PropTypes.func.isRequired,
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
  };

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props && !newProps.partyQuery.loading) {
      this.setState({
        name: newProps.partyQuery.Party.name,
        location: newProps.partyQuery.Party.location,
      });
    }
  }

  get partyId() {
    return this.props.partyQuery.Party.id;
  }

  isCurrentUserAdmin = userId => this.props.partyQuery.Party.admin.id === userId;

  handleDelete = async () => {
    await this.props.deletePartyMutation({ variables: { id: this.partyId } });
    this.props.history.replace('/');
  }

  handleSubmitEditForm = userId => async (e) => {
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
                  <form onSubmit={this.handleSubmitEditForm(user.id)}>
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

                  <button type="button" onClick={this.handleDelete}>
                    delete
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  }
}

const DELETE_PARTY_MUTATION = gql`
  mutation DeletePartyMutation($id: ID!) {
    deleteParty(id: $id) {
      id
    }
  }
`;

const UPDATE_PARTY_MUTATION = gql`
  mutation UpdatePartyMutation($id: ID!, $location: String, $name: String) {
    updateParty(id: $id, name: $name, location: $location) {
      name
      location
    }
  }
`;

const PARTY_QUERY = gql`
  query partyQuery($id: ID!) {
    Party(id: $id) {
      id
      name
      location
      admin {
        name
        id
      }
    }
  }
`;

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
)(PartyDetailPage);

// const DetailPageWithDelete = graphql(DELETE_PARTY_MUTATION)(DetailPageWithGraphQL);
export default withRouter(DetailPageWithGraphQL);
