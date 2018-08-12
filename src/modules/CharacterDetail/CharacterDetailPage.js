import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Hidden } from '../../components/utils';
import * as S from './styles';


export default class CharacterDetailPage extends React.Component {
  static propTypes = {
    character: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      gold: PropTypes.number,
      items: PropTypes.string,
      level: PropTypes.number,
      perkFragments: PropTypes.number,
      perks: PropTypes.string,
      xp: PropTypes.number,
    }).isRequired,
    updateCharacter: PropTypes.func.isRequired,
    setInputRef: PropTypes.func.isRequired,
  }

  render() {
    const { character, setInputRef, updateCharacter } = this.props;

    return (
      <div>
        <Link to={`/party/${character.party.id}`}>{'<-'} Back</Link>

        <form onSubmit={updateCharacter}>
          <S.EditableH1 defaultValue={character.name} innerRef={setInputRef('name')} placeholder="Name..." />
          <Hidden><button type="submit">Update Character</button></Hidden>
        </form>

        <h2>{character.characterClass.className} - {character.characterClass.race}</h2>
        <p>{character.characterClass.information}</p>

        <form onSubmit={updateCharacter}>
          <S.Label>
            Gold
            <input defaultValue={character.gold} ref={setInputRef('gold')} type="number" />
          </S.Label>
          <S.Label>
            Items
            <textarea defaultValue={character.items} ref={setInputRef('items')} />
          </S.Label>
          <S.Label>
            Level
            <input defaultValue={character.level} ref={setInputRef('level')} type="number" />
          </S.Label>
          <S.Label>
            Perk Fragments
            <input defaultValue={character.perkFragments} ref={setInputRef('perkFragments')} type="number" />
          </S.Label>
          <S.Label>
            Perks
            <textarea defaultValue={character.perks} ref={setInputRef('perks')} />
          </S.Label>
          <S.Label>
          Xp
            <input defaultValue={character.xp} ref={setInputRef('xp')} type="number" />
          </S.Label>
          <Hidden><button type="submit">Update Character</button></Hidden>
        </form>
      </div>
    );
  }
}
