import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CharacterDetailPage from './CharacterDetailPage';
import Loading from '../../components/Loading';
import { CHARACTER_QUERY } from './queries';
import { withRouterPropTypes } from '../../lib/propTypes';

class CharacterDetailContainer extends React.Component {
  static propTypes = {
    ...withRouterPropTypes,
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
