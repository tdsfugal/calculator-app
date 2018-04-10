// import gql from 'graphql-tag';

export const defaults = {
  computation: {
    id: 'calc_0',
    buffer: {
      text: 'foosenblat',
      value: 23,
      __typename: 'ComputationBuffer'
    },
    event: {
      key: '9',
      processed: 'false',
      __typename: 'ComputationEvent'
    },
    __typename: 'Computation'
  }
};

export const resolvers = {
  // updateBuffer: (_, { id, buffer }, { cache, getCacheKey }) => {
  //   // const key = getCacheKey({ __typename: 'Computation', id });
  //   // console.log(key);
  //
  //   const query = gql`
  //     query {
  //       computation @client {
  //         id
  //         buffer {
  //           text
  //           value
  //           __typename
  //         }
  //         event {
  //           key
  //           processed
  //           __typename
  //         }
  //         _typename
  //       }
  //     }
  //   `;
  //
  //   const { computation } = cache.readQuery({ query });
  //
  //   console.log(computation);
  //   //
  //   // const data = { ...computation, buffer };
  //   // cache.writeData({ key, data });
  //   return null;
  // }
};
