import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  query User($userId: ID!) {
    User(id: $userId) {
      id
      name
      email
    }
  }
`;

export const CurrentUserContext = createContext({});

export default class WithCurrentUser extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    userId: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Query
        query={GET_CURRENT_USER}
        variables={{ userId: this.props.userId }}
      >
        {({ data, error, loading }) => (
          <CurrentUserContext.Provider value={{ user: data.User, error, isUserLoading: loading }}>
            {this.props.children}
          </CurrentUserContext.Provider>
        )}
      </Query>
    );
  }
}
