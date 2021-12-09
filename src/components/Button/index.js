import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { bool, string } from 'prop-types';
import ButtonElement from './ButtonElement';

const REGISTER_KEY_EVENT = gql`
  mutation RegisterKeyEvent($id: String!, $key: String!) {
    registerKeyEvent(id: $id, key: $key) @client
  }
`;

const Button = ({ id, name, ...props }) => (
  <Mutation mutation={REGISTER_KEY_EVENT} variables={{ id, key: name }}>
    {registerKeyEvent => (
      <ButtonElement onClick={registerKeyEvent} name={name} {...props} />
    )}
  </Mutation>
);

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

export default Button;
