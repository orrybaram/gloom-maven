import React from 'react';
import { withCurrentUserPropTypes, withCurrentUserDefaultProps } from '../../lib/propTypes';
import withCurrentUser from '../../lib/withCurrentUser';

const logout = () => {
  // remove token from local storage and reload page to reset apollo client
  localStorage.removeItem('graphcoolToken');
  window.location.reload();
};

const HeaderUser = ({ currentUser, isUserLoading }) => (
  isUserLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      Welcome, {currentUser.name}
      <button
        onClick={logout}
        type="button"
      >
        Logout
      </button>
    </div>
  )
);

HeaderUser.propTypes = withCurrentUserPropTypes;
HeaderUser.defaultPropTypes = withCurrentUserDefaultProps;
export default withCurrentUser(HeaderUser);
