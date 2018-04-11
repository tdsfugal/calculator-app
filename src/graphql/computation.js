import gql from 'graphql-tag';

export const defaults = {
  computations: []
};

export const typeDefs = `

  type ComputationState {
    bufferString: String
    bufferNegative: Boolean
    buffer: Number
    accumulator: Number
    operator: String
  }

  type ComputationEvent {
    key: String
    pending: Boolean
  }

  type Computation {
    id: String!
    state: ComputationState
    event: ComputationEvent
  }

  type Query {
    computations: [Computation]
    computation( $id: String!): Computation
  }

`;

const stateFragment = gql`
  fragment stateFragment on Calculation @client {
    state {
      bufferString
      bufferNegative
      buffer
      accumulator
      operator
      __typename
    }
    __typename
  }
`;

const eventFragment = gql`
  fragment eventFragment on Calculation @client {
    event {
      key
      pending
      __typename
    }
    __typename
  }
`;

export const resolvers = {
  Mutation: {
    updateState: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Computation', id: variables.id });
      const data = {
        state: {
          ...variables.state,
          __typename: 'ComputationState'
        },
        __typename: 'Computation'
      };
      cache.writeFragment({ id, fragment: stateFragment, data });
      return null;
    },

    registerKeyEvent: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Computation', id: variables.id });
      const data = {
        event: {
          key: variables.key,
          pending: true,
          __typename: 'ComputationEvent'
        },
        __typename: 'Computation'
      };
      cache.writeFragment({ id, fragment: eventFragment, data });
      return null;
    },

    clearKeyEvent: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Computation', id: variables.id });
      const data = {
        event: {
          key: null,
          pending: false,
          __typename: 'ComputationEvent'
        },
        __typename: 'Computation'
      };
      cache.writeFragment({ id, fragment: eventFragment, data });
      return null;
    }
  }
};
