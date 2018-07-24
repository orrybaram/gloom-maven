const { fromEvent } = require('graphcool-lib');
const bcrypt = require('bcryptjs');

function getGraphcoolUser(api, email) {
  return api.request(`
    query {
      User(email: "${email}"){
        id
        password
      }
    }`)
    .then((userQueryResult) => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error);
      }
      return userQueryResult.User;
    });
}

module.exports = function authenticate(event) {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!');
    return { error: 'Email Authentication not configured correctly.' };
  }

  const { email, password } = event.data;

  const graphcool = fromEvent(event);
  const api = graphcool.api('simple/v1');

  return getGraphcoolUser(api, email)
    .then((graphcoolUser) => {
      if (graphcoolUser === null) {
        return Promise.reject(new Error('Invalid Credentials')); // returning same generic error so user can't find out what emails are registered.
      }
      return bcrypt.compare(password, graphcoolUser.password)
        .then((passwordCorrect) => {
          if (passwordCorrect) {
            return graphcoolUser.id;
          }
          return Promise.reject(new Error('Invalid Credentials'));
        });
    })
    .then(graphcoolUserId => graphcool.generateAuthToken(graphcoolUserId, 'User'))
    .then(token => ({ data: { token } }))
    .catch((error) => {
      console.log(`Error: ${JSON.stringify(error)}`);

      // don't expose error message to client!
      return { error: 'An unexpected error occured' };
    });
};
