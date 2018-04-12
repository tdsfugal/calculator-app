import getApolloClient from '../../graphql/getApolloClient';
import { getComputations } from '../../graphql/computation';

import calculate from './calculate';

export const NONE = 'none';
export const ADD = 'add';
export const SUBTRACT = 'subtract';
export const MULTIPLY = 'multiply';
export const DIVIDE = 'divide';

export const DEFAULT_COMPUTATION_STATE = {
  displayString: '',
  buffer: 0,
  accumulator: 0,
  operator: NONE,
  __typename: 'ComputationState'
};

const client = getApolloClient();

const processEvents = computations => {
  // Get the computations that need to be processed
  const pending = computations.length
    ? computations.filter(c => c && c.eventPending)
    : [];
  // Remove them from the list of priors while making a shallow copy
  const priors = computations.reduce((acc, comp) => {
    if (pending.indexOf(comp) < 0) acc.push(comp);
    return acc;
  }, []);
  // process the pending computations
  const processed = pending.map(
    ({ id, eventKey, state = DEFAULT_COMPUTATION_STATE }) => {
      const newState = calculate(eventKey, state);
      return {
        id,
        eventKey: '',
        eventPending: false,
        state: newState,
        __typename: 'Computation'
      };
    }
  );
  // Merge the old and the new
  const newComps = priors.concat(processed);
  // Update the cache
  client.writeQuery({
    query: getComputations,
    data: { computations: newComps }
  });
};

const observable = client.watchQuery({
  query: getComputations,
  pollInterval: 200000
});

const subscription = observable.subscribe({
  next: ({ data: { computations = [] } }) => {
    processEvents(computations);
  },
  error: err => {
    console.log(err);
  },
  complete: () => console.log('Subscription Complete')
});

export default subscription;
