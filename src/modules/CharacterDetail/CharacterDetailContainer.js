import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CharacterDetailPage from './CharacterDetailPage';
import Loading from '../../components/Loading';
import { CHARACTER_QUERY } from './queries';

class CharacterDetailContainer extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  render() {
    return (
      <Query
        query={CHARACTER_QUERY}
        variables={{ id: this.props.match.params.id }}
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <Loading />
            );
          }

          return (<CharacterDetailPage character={data.Character} />);
        }}
      </Query>
    );
  }
}

export default withRouter(CharacterDetailContainer);
