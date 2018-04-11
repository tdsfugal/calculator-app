import gql from 'graphql-tag';

export const defaults = {
  computations: []
};

export const typeDefs = `

  type ComputationState {
    displayString: String
    bufferNegative: Boolean
    buffer: Number
    accumulator: Number
    operator: String
  }

  type Computation {
    id: String!
    eventKey: String
    eventPending: String
    state: ComputationState
  }

  type Query {
    computations: [Computation]
    computation( $id: String!): Computation
  }

`;

export const getComputations = gql`
  query getComputations {
    computations @client {
      id
      eventKey
      eventPending
      state {
        displayString
        bufferNegative
        buffer
        accumulator
        operator
        __typename
      }
      __typename
    }
  }
`;

export const stateFragment = gql`
  fragment stateFragment on Computation @client {
    state {
      displayString
      bufferNegative
      buffer
      accumulator
      operator
      __typename
    }
  }
`;

export const eventFragment = gql`
  fragment eventFragment on Computation @client {
    eventKey
    eventPending
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
      console.log(`$$$$$$ UPDATING STATE for ${id} $$$$$$$$$`);
      cache.writeFragment({ id, fragment: stateFragment, data });
      return null;
    },

    registerKeyEvent: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Computation', id: variables.id });
      const data = {
        eventKey: variables.key,
        eventPending: true,
        __typename: 'Computation'
      };
      console.log(
        `!!!!!!!! REGISTERING KEY EVENT :${variables.key}: for ${id} !!!!!!!!!!`
      );
      cache.writeFragment({ id, fragment: eventFragment, data });
      return null;
    },

    clearKeyEvent: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Computation', id: variables.id });
      const data = {
        eventKey: '',
        eventPending: false,
        __typename: 'Computation'
      };
      console.log(`^^^^^^^^^^ CLEARING KEY EVENT for ${id} ^^^^^^^^^^^^`);
      cache.writeFragment({ id, fragment: eventFragment, data });
      return null;
    }
  }
};
