import React from 'react';
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

const query = gql`
  query getComputation($id: String!) @client {
    computation(id: $id) {
      id
      buffer {
        text
      }
    }
  }
`;

export default function Display() {
  return (
    <Query query={query}>
      {({ loading, error, data }) => (
        <div className={displayClass}>
          <Result>
            {!loading && !error && data ? data.computation.buffer.text : '0'}
          </Result>
        </div>
      )}
    </Query>
  );
}
