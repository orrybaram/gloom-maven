import React from 'react';
import { Query } from 'react-apollo';

import withCurrentUser from '../../lib/withCurrentUser';
import { withCurrentUserPropTypes } from '../../lib/propTypes';
import Loading from '../../components/Loading';
import { ALL_PARTIES_QUERY } from './queries';

import PartyPanel from './PartyPanel';
import * as S from './styles';

class ListPage extends React.Component {
  static propTypes = {
    ...withCurrentUserPropTypes,
  }

  render() {
    if (this.props.isUserLoading) {
      return <S.PartyPanel><Loading /></S.PartyPanel>;
    }

    return (
      <S.PartyPanel>
        <Query
          query={ALL_PARTIES_QUERY}
          variables={{ userId: this.props.currentUser.id }}
        >
          {({ data, loading }) => (
            loading
              ? <Loading />
              : <PartyPanel allParties={data.allParties} />
          )}
        </Query>
      </S.PartyPanel>
    );
  }
}

export default withCurrentUser(ListPage);
