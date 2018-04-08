import React from 'react';
import styled from 'react-emotion';

import Header from '../components/Header';

const App = styled('div')`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

export default () => (
  <App>
    <Header>Four Function Calculator</Header>
  </App>
);
