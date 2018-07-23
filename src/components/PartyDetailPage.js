import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

class PartyDetailPage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    deletePartyMutation: PropTypes.func.isRequired,
    partyQuery: PropTypes.shape({
      loading: PropTypes.bool,
      Party: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  handleDelete = async () => {
    await this.props.deletePartyMutation({ variables: { id: this.props.partyQuery.Party.id } });
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
      <div>
        <h1>
          {Party.name}
        </h1>
        <div>
          admin:
          {Party.admin.name}
        </div>
        <button type="button" onSubmit={this.handleDelete}>
          delete
        </button>
      </div>
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

const PARTY_QUERY = gql`
  query partyQuery($id: ID!) {
    Party(id: $id) {
      id
      name
      admin {
        name
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
)(PartyDetailPage);

const DetailPageWithDelete = graphql(DELETE_PARTY_MUTATION)(DetailPageWithGraphQL);
export default withRouter(DetailPageWithDelete);
