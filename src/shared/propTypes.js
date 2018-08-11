import PropTypes from 'prop-types';

export const withCurrentUserPropTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  refetchCurrentUser: PropTypes.func.isRequired,
};
