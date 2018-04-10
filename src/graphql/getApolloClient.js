import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

let client = null;

export default function getApolloClient() {
  if (!client) {
    const cache = new InMemoryCache();

    client = new ApolloClient({
      link: withClientState({ cache }),
      cache
    });
  }
  return client;
}
