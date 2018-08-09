import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class PartyDetailPage extends React.Component {
  static propTypes = {
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
      reputation: PropTypes.string,
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
      isLoading,
      handleDelete,
      onInputChange,
      onSubmitAddMemberForm,
      onSubmitEditForm,
      Party,
    } = this.props;

    if (isLoading) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        <Link to="/">{'<-'} Back</Link>
        <h1>
          {Party.name}
        </h1>
        <h2>{Party.location}</h2>

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

        <div>
          characters:
          {Party.characters.map(character => (
            <div>
              <Link to={`/character/${character.id}`}>{character.characterClass.race} - {character.characterClass.className}</Link>
            </div>
          ))}
        </div>

        {isCurrentUserAdmin && (
          <div>
            <h3>Admin:</h3>
            <form onSubmit={onSubmitEditForm}>
              <input
                value={editPartyFormData.name}
                placeholder="Name"
                onChange={onInputChange({ formName: 'party', fieldName: 'name' })}
              />
              <input
                value={editPartyFormData.location}
                placeholder="Location"
                onChange={onInputChange({ formName: 'party', fieldName: 'location' })}
              />
              <textarea
                value={editPartyFormData.notes}
                placeholder="Notes"
                onChange={onInputChange({ formName: 'party', fieldName: 'notes' })}
              />
              <input
                value={editPartyFormData.reputation}
                placeholder="Reputation"
                onChange={onInputChange({ formName: 'party', fieldName: 'reputation' })}
              />
              <textarea
                value={editPartyFormData.achievements}
                placeholder="Achievements"
                onChange={onInputChange({ formName: 'party', fieldName: 'achievements' })}
              />

              <button type="submit">
                Update
              </button>
            </form>

            <hr />

            <ul>
              {this.props.members.map(member => (
                <li key={member.email}><strong>{member.name}</strong> {member.email}</li>
              ))}
            </ul>

            <form onSubmit={onSubmitAddMemberForm}>
              <input
                placeholder="Add member by email"
                value={editMemberFormData.email}
                onChange={onInputChange({ formName: 'member', fieldName: 'email' })}
              />
              <button type="submit">Add</button>
            </form>

            <hr />

            <button type="button" onClick={handleDelete}>
              delete
            </button>
          </div>
        )}
      </div>
    );
  }
}
