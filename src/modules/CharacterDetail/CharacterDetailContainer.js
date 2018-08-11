import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CharacterDetailPage from './CharacterDetailPage';
import Loading from '../../components/Loading';
import { CHARACTER_QUERY } from './queries';
import { withRouterPropsTypes } from '../../lib/propTypes';

class CharacterDetailContainer extends React.Component {
  static propTypes = {
    ...withRouterPropsTypes,
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
