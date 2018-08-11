import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ALL_PARTIES_QUERY } from './queries';

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
        <ul>
          {this.props.allPartiesQuery.allParties.map(party => (
            <li key={party.id}>
              <Link to={`/party/${party.id}`}>
                {party.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

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
