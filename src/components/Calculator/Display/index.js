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

const GET_BUFFER_STRING = gql`
  query getBufferString @client {
    computations {
      id
      state {
        bufferString
      }
    }
  }
`;

const Display = ({ id }) => (
  <Query query={GET_BUFFER_STRING}>
    {({ loading, error, data }) => {
      // The filtering step should not be neccesary. There seems to be a bug in how
      // queries with arguments work in local cache. Not sure if it is a setup issue
      // or something deeper.
      const computations =
        !loading && !error && data && data.computations
          ? data.computations
          : [];
      const result = computations
        .filter(comp => comp && comp.id === id)
        .map(comp => comp.state && comp.state.bufferString);
      return (
        <div className={displayClass}>
          <Result>{result[0] || '0'}</Result>
        </div>
      );
    }}
  </Query>
);

Display.propTypes = {
  id: string.isRequired
};

export default Display;
