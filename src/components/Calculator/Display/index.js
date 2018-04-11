import React from 'react';
import { string } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import styled, { css } from 'react-emotion';

const displayClass = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #000;
  width: 100%;
  height: 60px;
  label: display;
`;

const Result = styled('span')`
  text-align: right;
  color: #000;
  margin: 15px;
  font-size: 30px;
`;

const GET_BUFFERS = gql`
  query getBuffers @client {
    computations {
      id
      buffer {
        text
      }
    }
  }
`;

const Display = ({ id }) => (
  <Query query={GET_BUFFERS}>
    {({ loading, error, data }) => {
      console.log(data);
      const computations = !loading && !error && data && data.computations;
      const result = computations
        .filter(comp => comp && comp.id === id)
        .map(comp => comp.buffer && comp.buffer.text);
      return (
        <div className={displayClass}>
          <Result>{result || '0'}</Result>
        </div>
      );
    }}
  </Query>
);

Display.propTypes = {
  id: string.isRequired
};

export default Display;
