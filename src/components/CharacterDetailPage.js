import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';


const CHARACTER_QUERY = gql`
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

class CharacterDetailPage extends React.Component {
  static propTypes = {
    characterQuery: PropTypes.shape({
      refetch: PropTypes.func,
      loading: PropTypes.bool,
      Character: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    }).isRequired,
  }

  get characterId() {
    return this.props.characterQuery.Character.id;
  }

  render() {
    if (this.props.characterQuery.loading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    const { Character } = this.props.characterQuery;

    return (
      <div>
        <Link to={`/party/${Character.party.id}`}>{'<-'} Back</Link>
        <h1>
          {Character.characterClass.className}
        </h1>
        <h2>{Character.characterClass.race}</h2>
        <p>{Character.characterClass.information}</p>

        <ul>
          <li>XP: {Character.xp}</li>
          <li>Gold: {Character.gold}</li>
        </ul>

      </div>
    );
  }
}

const DetailPageWithGraphQL = compose(
  graphql(CHARACTER_QUERY, {
    name: 'characterQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({ match }) => ({
      variables: {
        id: match.params.id,
      },
    }),
  }),
)(CharacterDetailPage);

export default withRouter(DetailPageWithGraphQL);
