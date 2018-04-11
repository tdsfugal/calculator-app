import gql from 'graphql-tag';

export const defaults = {
  computations: [
    {
      id: 'calc_0',
      buffer: {
        text: '2345.9',
        __typename: 'ComputationBuffer'
      },
      event: {
        key: '7',
        processed: false,
        __typename: 'ComputationEvent'
      },
      __typename: 'Computation'
    },
    {
      id: 'calc_1',
      buffer: {
        text: '-573.92',
        __typename: 'ComputationBuffer'
      },
      event: {
        key: '0',
        processed: false,
        __typename: 'ComputationEvent'
      },
      __typename: 'Computation'
    }
  ]
};

export const typeDefs = `

  type Computation {
    id: String!
    buffer: {
      text: String
    }
    event: {
      key: String
      processed: Boolean
    }
  }

  type Query {
    computations: [Computation]
    computation( $id: String!): Computation
  }

`;

export const resolvers = {
  Mutation: {
    registerKeyEvent: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Calculation', id: variables.id });
      const fragment = gql`
        fragment event on Calculation {
          event {
            key
            processed
          }
        }
      `;
      const calculation = cache.readFragment({ fragment, id });
      const data = {
        ...calculation,
        event: {
          key: variables.key,
          processed: false,
          __typename: 'CalculationEvent'
        }
      };
      cache.writeData({ id, data });
      return null;
    }
  }
};
