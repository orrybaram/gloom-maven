import gql from 'graphql-tag';

export const CHARACTER_QUERY = gql`
  query characterQuery($id: ID!) {
    Character(id: $id) {
      id
      name
      xp
      gold
      perkFragments
      perks
      level
      items
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

export const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacterMutation(
    $id: ID!,
    $gold: Int,
    $items: String,
    $level: Int,
    $name: String,
    $perkFragments: Int,
    $perks: String,
    $xp: Int,
  ) {
    updateCharacter(
      id: $id,
      gold: $gold,
      items: $items,
      level: $level,
      name: $name,
      perkFragments: $perkFragments,
      perks: $perks,
      xp: $xp,
    ) {
      id
      gold
      items
      level
      name
      perkFragments
      perks
      xp
    }
  }
`;
