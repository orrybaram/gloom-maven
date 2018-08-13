import gql from 'graphql-tag';

export const ALL_PARTIES_QUERY = gql`
  query AllPartiesQuery($userId: ID!) {
    allParties(orderBy: createdAt_DESC, filter: {
      OR: [{
        members_some: {
          id: $userId
        }
      }, {
        admin: {
          id: $userId
        }
      }]
    }) {
      id
      name
    }
  }
`;
