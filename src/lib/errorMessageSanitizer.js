export default errorMessage => (
  errorMessage
    .replace('GraphQL error:', '')
    .replace('function execution error:', '')
);
