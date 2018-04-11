import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { bool, string } from 'prop-types';
import ButtonElement from './ButtonElement';

export default function Button({ id, name, ...props }) {
  return (
    <ApolloConsumer>
      {client => {
        const onClick = () => {
          client.writeData({
            data: {
              computation: {
                id,
                event: {
                  key: name,
                  processed: false,
                  __typename: 'ComputationEvent'
                },
                __typename: 'Computation'
              }
            }
          });
          console.log(client.cache);
        };
        return <ButtonElement onClick={onClick} name={name} {...props} />;
      }}
    </ApolloConsumer>
  );
}

Button.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  doubleHigh: bool,
  doubleWide: bool
};

Button.defaultProps = {
  doubleHigh: false,
  doubleWide: false
};
