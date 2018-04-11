import gql from 'graphql-tag';

export const getComputations = gql`
  query getComputations {
    computation @client {
      id
      buffer {
        text
        value
        __typename
      }
      event {
        key
        processed
        __typename
      }
      __typename
    }
  }
`;

export const getComputationEventById = gql`
  query getComputationEventById($id: String!) {
    computation(id: $id) @client {
      id
      event {
        key
        processed
        __typename
      }
      __typename
    }
  }
`;

export const getComputationBufferById = gql`
  query getComputationBufferById($id: String!) {
    computation(id: $id) @client {
      id
      buffer {
        text
        value
        __typename
      }
      __typename
    }
  }
`;
