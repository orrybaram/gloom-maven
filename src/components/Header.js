import React from 'react';
import { CurrentUserContext } from './WithCurrentUser';

const logout = () => {
  // remove token from local storage and reload page to reset apollo client
  localStorage.removeItem('graphcoolToken');
  window.location.reload();
};

export default () => (
  <CurrentUserContext>
    {({ user, isUserLoading }) => (
      <header>
        {isUserLoading
          ? <span>Loading...</span>
          : (
            <div>
              Welcome, {user.name}
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
    )}
  </CurrentUserContext>
);
