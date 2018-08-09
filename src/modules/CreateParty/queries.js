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

export const CHARACTER_CLASS_QUERY = gql`
  query GetDefaultCharacterClassIds {
    allCharacterClasses(filter: {
      OR: [
        { classId: "brute" },
        { classId: "cragheart" },
        { classId: "scoundrel" }
        { classId: "spellweaver" }
        { classId: "tinkerer" }
        { classId: "mindthief" }
      ]
    }) {
      id
    }
  }
`;

export const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateDefaultCharactersMutation (
    $partyId: ID!,
    $characterClassId: ID!,
  ) {
    createCharacter(
      partyId: $partyId,
      characterClassId: $characterClassId
    ) {
      id
    }
  }
`;
