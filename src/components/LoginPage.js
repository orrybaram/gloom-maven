import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <Link to="/login">
      Log in with Email
    </Link>

    <Link to="/signup">
      Sign up with Email
    </Link>
  </div>
);
