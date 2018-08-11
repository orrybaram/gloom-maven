import gql from 'graphql-tag';

export const FIND_USER_QUERY = gql`
  query findUserQuery($email: String!) {
    User(email: $email) {
      id
    }
  }
`;

export const DELETE_PARTY_MUTATION = gql`
  mutation DeletePartyMutation($id: ID!) {
    deleteParty(id: $id) {
      id
    }
  }
`;

export const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacterMutation($id: ID!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`;

export const UPDATE_PARTY_MUTATION = gql`
  mutation UpdatePartyMutation(
    $id: ID!,
    $achievements: String,
    $location: String,
    $name: String,
    $notes: String,
    $reputation: Int,
  ) {
    updateParty(
      id: $id,
      achievements: $achievements,
      location: $location,
      name: $name,
      notes: $notes,
      reputation: $reputation,
    ) {
      achievements
      location
      name
      notes
      reputation
    }
  }
`;

export const UPDATE_PARTY_MEMBERS_MUTATION = gql`
  mutation UpdatePartyMemberMutation($joinedPartiesPartyId: ID!, $membersUserId: ID!) {
    addToUserJoinedParties(joinedPartiesPartyId: $joinedPartiesPartyId, membersUserId: $membersUserId) {
      membersUser {
        id
        email
        name
      }
    }
  }
`;

export const PARTY_QUERY = gql`
  query partyQuery($id: ID!) {
    Party(id: $id) {
      id
      achievements
      location
      name
      notes
      reputation
      members {
        id
        email
        name
      }
      admin {
        name
        id
        email
      }
      characters {
        id
        characterClass {
          className
          information
          race
        }
        name
        gold
        xp
      }
    }
  }
`;