import gql from 'graphql-tag';

export const CHARACTER_QUERY = gql`
  query characterQuery($id: ID!) {
    Character(id: $id) {
      name
      xp
      gold
      characterClass {
        race
        information
        className
      }
      party {
        id
      }
    }
  }
`;
