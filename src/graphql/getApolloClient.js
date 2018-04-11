import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import { defaults, typeDefs, resolvers } from './computation';

let client = null;

export default function getApolloClient() {
  if (!client) {
    const cache = new InMemoryCache();

    const stateLink = withClientState({
      cache,
      defaults,
      typeDefs,
      resolvers
    });

    client = new ApolloClient({
      link: stateLink,
      cache
    });
  }
  return client;
}
