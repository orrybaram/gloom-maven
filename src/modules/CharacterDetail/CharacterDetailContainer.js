import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Loading from '../../components/Loading';
import { withRouterPropTypes } from '../../lib/propTypes';

import CharacterDetailPage from './CharacterDetailPage';
import { CHARACTER_QUERY, UPDATE_CHARACTER_MUTATION } from './queries';

class CharacterDetailContainer extends React.Component {
  static propTypes = {
    ...withRouterPropTypes,
  }

  constructor() {
    super();

    this.inputs = {
      gold: null,
      items: null,
      level: null,
      name: null,
      perkFragments: null,
      perks: null,
      xp: null,
    };

    this.Character = {};
    this.updateCharacter = null;
    this.debouncedUpdateCharacter = debounce(this.submitUpdateCharacterForm, 1000);
  }

  setInputRef = inputName => (_ref) => {
    if (!_ref) return;
    const ref = _ref;
    ref.onblur = this.debouncedUpdateCharacter;

    this.inputs[inputName] = ref;
  }

  getIsFormDirty = (payload) => {
    let isDirty = false;
    Object.keys(payload).forEach((key) => {
      if (key === 'id') return;

      if (payload[key] !== this.Character[key]) {
        isDirty = true;
      }
    });

    return isDirty;
  }

  submitUpdateCharacterForm = (e) => {
    const characterId = this.props.match.params.id;
    e.preventDefault();


    const variables = Object.keys(this.inputs).reduce((acc, input) => {
      let { value } = this.inputs[input];
      if (/^\d+$/.test(value)) {
        value = Number(value);
      }

      return {
        ...acc,
        [input]: value,
      };
    }, {
      id: characterId,
    });

    if (!this.getIsFormDirty(variables)) return;

    this.updateCharacter({
      variables,
    });
  }

  render() {
    const characterId = this.props.match.params.id;
    return (
      <Query
        query={CHARACTER_QUERY}
        variables={{ id: characterId }}
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <Loading />
            );
          }

          return (
            <Mutation mutation={UPDATE_CHARACTER_MUTATION}>
              {(updateCharacter) => {
                this.updateCharacter = updateCharacter;
                this.Character = data.Character;

                return (
                  <CharacterDetailPage
                    character={data.Character}
                    updateCharacter={this.submitUpdateCharacterForm}
                    setInputRef={this.setInputRef}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(CharacterDetailContainer);
