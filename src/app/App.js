import React from 'react';
import { css } from 'react-emotion';

import Header from '../components/Header';
import Calculator from '../components/Calculator';

const appClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  label: app;
`;

export default function App() {
  return (
    <div className={appClass}>
      <Header>Collaborative Calculator</Header>
      <Calculator />
    </div>
  );
}
