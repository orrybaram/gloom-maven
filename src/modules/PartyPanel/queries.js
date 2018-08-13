import gql from 'graphql-tag';

export const ALL_PARTIES_QUERY = gql`
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
