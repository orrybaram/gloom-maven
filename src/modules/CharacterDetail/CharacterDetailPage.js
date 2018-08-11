import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CharacterDetailPage extends React.Component {
  static propTypes = {
    character: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }

  render() {
    const { character } = this.props;

    return (
      <div>
        <Link to={`/party/${character.party.id}`}>{'<-'} Back</Link>
        <h1>
          {character.characterClass.className}
        </h1>
        <h2>{character.characterClass.race}</h2>
        <p>{character.characterClass.information}</p>

        <ul>
          <li>XP: {character.xp}</li>
          <li>Gold: {character.gold}</li>
        </ul>
      </div>
    );
  }
}
