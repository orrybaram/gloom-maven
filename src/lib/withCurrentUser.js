import React from 'react';
import { Query } from 'react-apollo';

import Loading from '../components/Loading';
import { LOGGED_IN_USER_QUERY, GET_CURRENT_USER } from '../shared/queries';

export default function withCurrentUser(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Query query={LOGGED_IN_USER_QUERY}>
          {({ data: loggedInUserQuery }) => {
            if (loggedInUserQuery.loading || !loggedInUserQuery.loggedInUser) return <Loading />;

            return (
              <Query
                query={GET_CURRENT_USER}
                variables={{ userId: loggedInUserQuery.loggedInUser.id }}
              >
                {({ data, loading, refetch }) => (
                  <WrappedComponent
                    currentUser={data.User}
                    isUserLoading={loading}
                    refetchCurrentUser={refetch}
                    {...this.props}
                  />
                )}
              </Query>
            );
          }}
        </Query>
      );
    }
  };
}
