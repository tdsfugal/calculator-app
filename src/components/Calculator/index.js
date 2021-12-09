import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { string } from 'prop-types';

import CalculatorA from './CalculatorA';
import CalculatorB from './CalculatorB';
import { DEFAULT_COMPUTATION_STATE } from '../../services/calculate';
import { getComputations } from '../../graphql/computation';

let nextId = 0;

export default function Calculator({ type }) {
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
          client.writeQuery({
            query: getComputations,
            data: { computations: computations.concat([newComp]) }
          });
        }
        switch (type) {
          case 'A':
            return <CalculatorA id={id} />;
          case 'B':
            return <CalculatorB id={id} />;
          default:
            return null;
        }
      }}
    </ApolloConsumer>
  );
}

Calculator.propTypes = {
  type: string.isRequired
};
