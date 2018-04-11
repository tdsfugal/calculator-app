import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import getApolloClient from './graphql/getApolloClient';

import App from './app/App';

import './services/calculate';

ReactDOM.render(
  <ApolloProvider client={getApolloClient()}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
