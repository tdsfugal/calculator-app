import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import CalculatorFace from './CalculatorFace';
import { DEFAULT_COMPUTATION_STATE } from '../../services/calculate';
import { getComputations } from '../../graphql/computation';

let nextId = 0;

export default function Calculator() {
  // generate a unique id for this computation
  const id = `calc_${nextId}`;
  nextId += 1;

  return (
    <ApolloConsumer>
      {client => {
        // Initialze the computation in GraphQL, if needed
        const { computations = [] } = client.readQuery({
          query: getComputations
        });
        const compIds = computations.map(c => c.id);
        if (!compIds.includes(id)) {
          computations.push({
            id,
            state: Object.assign({}, DEFAULT_COMPUTATION_STATE),
            event: {
              key: '',
              pending: false,
              __typename: 'ComputationEvent'
            },
            __typename: 'Computation'
          });
          const data = { computations };
          client.writeQuery({ query: getComputations, data });
        }
        return <CalculatorFace id={id} />;
      }}
    </ApolloConsumer>
  );
}
