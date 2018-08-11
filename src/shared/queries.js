import gql from 'graphql-tag';

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query User($userId: ID!) {
    User(id: $userId) {
      id
      name
      email
    }
  }
`;
