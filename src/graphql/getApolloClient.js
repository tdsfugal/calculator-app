import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { toIdValue } from 'apollo-utilities';

import { defaults, typeDefs, resolvers } from './computation';

let client = null;

export default function getApolloClient() {
  if (!client) {
    const cache = new InMemoryCache({
      cacheRedirects: {
        Query: {
          computation: (_, args) =>
            toIdValue(
              cache.config.dataIdFromObject({
                _typename: 'Computation',
                id: args.id
              })
            )
        }
      }
    });

    const stateLink = withClientState({
      cache,
      defaults,
      typeDefs,
      resolvers
    });

    client = new ApolloClient({
      link: stateLink,
      cache,
      connectToDevTools: true
    });
  }
  return client;
}
