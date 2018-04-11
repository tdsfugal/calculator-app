import gql from 'graphql-tag';

import getApolloClient from '../../graphql/getApolloClient';

import calculate from './calculate';

export const NONE = 'none';
export const ADD = 'add';
export const SUBTRACT = 'subtract';
export const MULTIPLY = 'multiply';
export const DIVIDE = 'divide';

export const DEFAULT_COMPUTATION = {
  bufferString: '',
  bufferNegative: false,
  buffer: 0,
  accumulator: 0,
  operator: NONE
};

const client = getApolloClient();

const getPending = gql`
  query getPending {
    computations @client {
      id
      event(pending: true) {
        key
        pending
      }
    }
  }
`;

const observable = client.watchQuery({
  query: getPending,
  pollInterval: 500
});

const subscription = observable.subscribe({
  next: ({ data }) => {
    const pendingComputations =
      data && data.computations && data.computations.length
        ? data.computations.filter(c => c && c.event && c.event.pending)
        : [];
    console.log(pendingComputations);
  },
  error: err => {
    console.log(err);
  },
  complete: () => console.log('Subscription Complete')
});
