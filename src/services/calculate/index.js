import gql from 'graphql-tag';

import getApolloClient from '../../graphql/getApolloClient';

import calculate from './calculate';

export const NONE = 'none';
export const ADD = 'add';
export const SUBTRACT = 'subtract';
export const MULTIPLY = 'multiply';
export const DIVIDE = 'divide';

export const DEFAULT_COMPUTATION_STATE = {
  bufferString: '',
  bufferNegative: false,
  buffer: 0,
  accumulator: 0,
  operator: NONE
};

const client = getApolloClient();

const getComputations = gql`
  query getComputations {
    computations @client {
      id
      state {
        bufferString
        bufferNegative
        buffer
        accumulator
        operator
        __typename
      }
      event {
        key
        pending
        __typename
      }
      __typename
    }
  }
`;

const observable = client.watchQuery({
  query: getComputations,
  pollInterval: 500
});

const subscription = observable.subscribe({
  next: ({ data: { computations = [] } }) => {
    const pendingComputations = computations.length
      ? computations.filter(c => c && c.event && c.event.pending)
      : [];

    pendingComputations.forEach(
      ({ id, event, state = DEFAULT_COMPUTATION_STATE }) => {
        console.log(`====== ${id} Pending =======`);
        console.log(event);
        console.log(state);
        const newState = calculate(event.key, state);
        console.log(newState);
      }
    );
  },
  error: err => {
    console.log(err);
  },
  complete: () => console.log('Subscription Complete')
});

export default subscription;
