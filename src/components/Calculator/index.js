import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import CalculatorFaceA from './CalculatorFaceA';
import CalculatorFaceB from './CalculatorFaceB';
import { DEFAULT_COMPUTATION_STATE } from '../../services/calculate';
import { getComputations } from '../../graphql/computation';

let nextId = 0;

export default function Calculator({ type }) {
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
        switch (type) {
          case 'A':
            return <CalculatorFaceA id={id} />;
          case 'B':
            return <CalculatorFaceB id={id} />;
          default:
            return null;
        }
      }}
    </ApolloConsumer>
  );
}
