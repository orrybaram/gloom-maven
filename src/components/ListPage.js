import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Party from './Party';

class ListPage extends React.Component {
  static propTypes = {
    allPartiesQuery: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      allParties: PropTypes.array,
    }).isRequired,
  }

  componentDidMount() {
    this.props.allPartiesQuery.refetch();
  }

  render() {
    if (this.props.allPartiesQuery.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <div>
        Your Parties:
        <div>
          {this.props.allPartiesQuery.allParties.map(party => (
            <Party key={party.id} party={party} />
          ))}
        </div>
      </div>
    );
  }
}

const ALL_PARTIES_QUERY = gql`
  query AllPartiesQuery($user_id: ID!) {
    allParties(orderBy: createdAt_DESC, filter: {
      OR: [{
        members_some: {
          id: $user_id
        }
      }, {
        admin: {
          id: $user_id
        }
      }]
    }) {
      id
      name
    }
  }
`;

const ListPageWithGraphQL = (
  graphql(ALL_PARTIES_QUERY, {
    name: 'allPartiesQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({ userId }) => ({
      variables: {
        user_id: userId,
      },
    }),
  })
)(ListPage);

export default ListPageWithGraphQL;
