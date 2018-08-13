import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { Box, Flex } from 'grid-styled/emotion';
import { Hidden } from '../../components/utils';
import {
  Input,
  Textarea,
  Label,
  LabelText,
} from '../../components';

import CharacterDetailModal from './CharacterDetailModal';
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
      characterClass: PropTypes.shape({
        race: PropTypes.string,
        className: PropTypes.string,
        information: PropTypes.string,
      })
    }).isRequired,
    updateCharacter: PropTypes.func.isRequired,
    setInputRef: PropTypes.func.isRequired,
  }

  render() {
    const { character, setInputRef, updateCharacter } = this.props;

    return (
      <Box width={[1, 0.5, 0.333]}>
        <Link to={`/party/${character.party.id}`}>
          <Flex alignItems="center">
            <Icon>arrow_back_ios</Icon> Back
          </Flex>
        </Link>
        <Box mt={3}>
          <form onSubmit={updateCharacter}>
            <S.EditableH1 defaultValue={character.name} innerRef={setInputRef('name')} placeholder="Name..." />
            <Hidden><button type="submit">Update Character</button></Hidden>
          </form>

          <h2>
            {character.characterClass.race} {character.characterClass.className}

            <CharacterDetailModal
              race={character.characterClass.race}
              className={character.characterClass.className}
              information={character.characterClass.information}
            />
          </h2>
          <form onSubmit={updateCharacter}>
            <Box mb={2}>
              <Label>
                <LabelText>Level</LabelText>
                <Input defaultValue={character.level} innerRef={setInputRef('level')} type="number" />
              </Label>
            </Box>
            <Box mb={2}>
              <Label>
                <LabelText>Xp</LabelText>
                <Input defaultValue={character.xp} innerRef={setInputRef('xp')} type="number" />
              </Label>
            </Box>
            <Box mb={2}>
              <Label>
                <LabelText>Gold</LabelText>
                <Input defaultValue={character.gold} innerRef={setInputRef('gold')} type="number" />
              </Label>
            </Box>
            <Box mb={2}>
              <Label>
                <LabelText>Items</LabelText>
                <Textarea defaultValue={character.items} innerRef={setInputRef('items')} />
              </Label>
            </Box>
            <Box mb={2}>
              <Label>
                <LabelText>Perk Fragments</LabelText>
                <Input defaultValue={character.perkFragments} innerRef={setInputRef('perkFragments')} type="number" />
              </Label>
            </Box>
            <Box mb={2}>
              <Label>
                <LabelText>Perks</LabelText>
                <Textarea defaultValue={character.perks} innerRef={setInputRef('perks')} />
              </Label>
            </Box>

            <Hidden><button type="submit">Update Character</button></Hidden>
          </form>
        </Box>
      </Box>
    );
  }
}
