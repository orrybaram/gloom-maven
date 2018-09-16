import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { Box, Flex } from 'grid-styled/emotion';
import {
  Button,
  Loading,
  Label,
  LabelText,
  Input,
  Textarea,
} from '../../components';
import * as S from './styles';

export default class PartyDetailPage extends React.Component {
  static propTypes = {
    isDeleting: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isCurrentUserAdmin: PropTypes.bool.isRequired,
    Party: PropTypes.shape({
      admin: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
      }),
      name: PropTypes.string,
      notes: PropTypes.string,
      location: PropTypes.string,
      reputation: PropTypes.number,
      achievements: PropTypes.string,
      characters: PropTypes.arrayOf(PropTypes.shape({
        characterClass: PropTypes.shape({
          race: PropTypes.string,
          className: PropTypes.string,
        }),
        id: PropTypes.string,
      })),
    }).isRequired,
    editPartyFormData: PropTypes.shape({
      name: PropTypes.string,
      notes: PropTypes.string,
      location: PropTypes.string,
      reputation: PropTypes.number,
      achievements: PropTypes.string,
    }).isRequired,
    editMemberFormData: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    onSubmitEditForm: PropTypes.func.isRequired,
    onSubmitAddMemberForm: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    })).isRequired,
  }

  render() {
    const {
      editMemberFormData,
      editPartyFormData,
      isCurrentUserAdmin,
      isDeleting,
      isLoading,
      handleDelete,
      onInputChange,
      onSubmitAddMemberForm,
      onSubmitEditForm,
      Party,
    } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        <Link to="/">
          <Flex alignItems="center">
            <Icon>arrow_back_ios</Icon> Back
          </Flex>
        </Link>
        <h1>
          {Party.name}
        </h1>
        <Icon>explore</Icon>{Party.location}

        <div>
          admin:
          {Party.admin.name} {Party.admin.email}
        </div>

        <div>
          notes:
          {Party.notes}
        </div>

        <div>
          reputation:
          {Party.reputation}
        </div>

        <div>
          achievements:
          {Party.achievements}
        </div>


        <h4>characters</h4>
        {Party.characters.map(character => (
          <div key={character.id}>
            <Link to={`/character/${character.id}`}>
              {character.characterClass.race} - {character.characterClass.className}
            </Link>
          </div>
        ))}

        {isCurrentUserAdmin && (
          <div>
            <hr />
            <h3>Admin</h3>
            <Box width={[1, 1 / 3]}>
              <form onSubmit={onSubmitEditForm}>
                <Label mb={2}>
                  <LabelText>Name</LabelText>
                  <Input
                    value={editPartyFormData.name}
                    placeholder="Name"
                    onChange={onInputChange({ formName: 'party', fieldName: 'name' })}
                  />
                </Label>
                <Label mb={2}>
                  <LabelText>Location</LabelText>
                  <Input
                    value={editPartyFormData.location}
                    placeholder="Location"
                    onChange={onInputChange({ formName: 'party', fieldName: 'location' })}
                  />
                </Label>
                <Label mb={2}>
                  <LabelText>Notes</LabelText>
                  <Textarea
                    value={editPartyFormData.notes}
                    placeholder="Notes"
                    onChange={onInputChange({ formName: 'party', fieldName: 'notes' })}
                  />
                </Label>
                <Label mb={2}>
                  <LabelText>Reputation</LabelText>
                  <Input
                    value={editPartyFormData.reputation}
                    placeholder="Reputation"
                    onChange={onInputChange({ formName: 'party', fieldName: 'reputation' })}
                  />
                </Label>
                <Label mb={2}>
                  <LabelText>Achievements</LabelText>
                  <Textarea
                    value={editPartyFormData.achievements}
                    placeholder="Achievements"
                    onChange={onInputChange({ formName: 'party', fieldName: 'achievements' })}
                  />
                </Label>

                <Button type="submit" variant="contained">
                  Update
                </Button>
              </form>
            </Box>

            <hr />

            <h3>Party Members</h3>
            <ul>
              {this.props.members.map(member => (
                <li key={member.email}><strong>{member.name}</strong> {member.email}</li>
              ))}
            </ul>

            <form onSubmit={onSubmitAddMemberForm}>
              <Flex width={[1, 0.5]}>
                <Box width={0.75}>
                  <Input
                    placeholder="Add member by email"
                    value={editMemberFormData.email}
                    onChange={onInputChange({ formName: 'member', fieldName: 'email' })}
                  />
                </Box>

                <Box width={0.25} ml={2}>
                  <Button type="submit" variant="contained">Add</Button>
                </Box>
              </Flex>
            </form>

            <hr />

            <h3>Danger Zone</h3>
            <p>Delete party, this cannot be undone</p>
            <Button type="button" color="danger" onClick={handleDelete} variant="contained">
              {isDeleting ? 'Deleting...' : 'Delete Party'}
            </Button>
          </div>
        )}
      </div>
    );
  }
}
