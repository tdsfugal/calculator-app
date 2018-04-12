import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import CalculatorFace from './CalculatorFace';
import { DEFAULT_COMPUTATION_STATE } from '../../services/calculate';
import { getComputations } from '../../graphql/computation';

let nextId = 0;

export default function Calculator() {
  // generate a unique id for this computation
  const id = `comp_${nextId}`;
  nextId += 1;

  return (
    <ApolloConsumer>
      {client => {
        // Initialze the computation in GraphQL, if needed
        const { computations } = client.readQuery({
          query: getComputations
        });
        const compIds = computations ? computations.map(c => c.id) : [];
        if (!compIds.includes(id)) {
          const newComp = {
            id,
            eventKey: '',
            eventPending: false,
            state: Object.assign({}, DEFAULT_COMPUTATION_STATE),
            __typename: 'Computation'
          };
          const newComps = computations.concat([newComp]);
          console.log(`+++++++ INITIALIZING ${id} ++++++++`);
          console.log(newComps);
          client.writeQuery({
            query: getComputations,
            data: { computations: newComps }
          });
        }
        return <CalculatorFace id={id} />;
      }}
    </ApolloConsumer>
  );
}
