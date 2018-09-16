import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled/emotion';
import localforage from 'localforage';
import { Label, Input, LabelText } from '../../components';

const getCharacterDetailsFromLocalStorage = async ({ id, type }) => {
  const characterDetails = await localforage.getItem(id);
  if (!characterDetails) return '';
  return characterDetails[type];
};

export default class CharacterEncounterPage extends Component {
  static propTypes = {
    characterId: PropTypes.string.isRequired,
  }

  state = {
    hp: '',
    xp: '',
  }

  componentDidMount = async () => {
    this.setState({
      hp: await getCharacterDetailsFromLocalStorage({ id: this.props.characterId, type: 'hp' }),
      xp: await getCharacterDetailsFromLocalStorage({ id: this.props.characterId, type: 'xp' }),
    });
  }

  onInputChange = type => async (e) => {
    const { value } = e.target;

    this.setState({
      [type]: value,
    });

    const characterDetails = await localforage.getItem(this.props.characterId);

    if (!characterDetails) {
      return localforage.setItem(this.props.characterId, { [type]: value });
    }

    return localforage.setItem(this.props.characterId, {
      ...characterDetails,
      [type]: value,
    });
  }

  render() {
    return (
      <Box>
        <h2>Encounter Stats</h2>
        <Flex>
          <Label m={1}>
            <LabelText>HP</LabelText>
            <Input type="number" name="hp" value={this.state.hp} onChange={this.onInputChange('hp')} />
          </Label>
          <Label m={1}>
            <LabelText>XP</LabelText>
            <Input type="number" name="xp" value={this.state.xp} onChange={this.onInputChange('xp')} />
          </Label>
        </Flex>
      </Box>
    );
  }
}
