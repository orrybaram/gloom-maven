import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import withCurrentUser from '../lib/withCurrentUser';
import { withCurrentUserPropTypes } from '../lib/propTypes';

const logout = () => {
  // remove token from local storage and reload page to reset apollo client
  localStorage.removeItem('graphcoolToken');
  window.location.reload();
};

const Header = ({ currentUser, isUserLoading }) => (
  <header>
    <Link to="/">Home</Link>
    {isUserLoading
      ? <Loading />
      : (
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
    }
  </header>
);

Header.propTypes = withCurrentUserPropTypes;
export default withCurrentUser(Header);
