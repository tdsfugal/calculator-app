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
        pending: false,
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
        pending: true,
        __typename: 'ComputationEvent'
      },
      __typename: 'Computation'
    }
  ]
};

export const typeDefs = `

  type ComputationBuffer {
    text: String
  }

  type ComputationEvent {
    key: String
    pending: Boolean
  }

  type Computation {
    id: String!
    buffer: ComputationBuffer
    event: ComputationEvent
  }

  type Query {
    computations: [Computation]
    computation( $id: String!): Computation
  }

`;

const bufferFragment = gql`
  fragment bufferFragment on Calculation @client {
    buffer {
      text
    }
  }
`;

const eventFragment = gql`
  fragment eventFragment on Calculation @client {
    event {
      key
      pending
    }
  }
`;

export const resolvers = {
  Mutation: {
    updateBuffer: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Computation', id: variables.id });
      const data = {
        buffer: {
          text: variables.text,
          __typename: 'ComputationBuffer'
        },
        __typename: 'Computation'
      };
      cache.writeFragment({ id, fragment: bufferFragment, data });
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
