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

export const withRouterPropsTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
