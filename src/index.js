import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Login from './modules/Login';
import Signup from './modules/Signup';
import App from './components/App';
import { graphcoolEndpoint } from './config';

const httpLink = createHttpLink({ uri: graphcoolEndpoint });

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken');
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__), // eslint-disable-line
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  </ApolloProvider>
),
document.getElementById('root'));
