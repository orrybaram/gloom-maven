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

export const withRouterPropTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export const withDialoguePropTypes = {
  confirm: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  prompt: PropTypes.func.isRequired,
};
