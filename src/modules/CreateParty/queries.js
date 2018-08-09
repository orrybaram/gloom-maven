import gql from 'graphql-tag';

export const CREATE_PARTY_MUTATION = gql`
  mutation CreatePartyMutation (
    $adminId: ID!,
    $name: String!,
    $location: String!,
  ) {
    createParty(
      adminId: $adminId,
      name: $name,
      location: $location,
    ) {
      id
    }
  }
`;
