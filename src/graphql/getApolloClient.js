import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import gql from 'graphql-tag';
import { resolvers, defaults } from './calculation';

let client = null;

export default function getApolloClient() {
  if (!client) {
    const cache = new InMemoryCache();

    const stateLink = withClientState({
      resolvers,
      defaults,
      cache
    });

    client = new ApolloClient({
      link: stateLink,
      cache
    });
  }
  return client;
}
