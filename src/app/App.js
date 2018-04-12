import React from 'react';
import styled, { css } from 'react-emotion';
import { injectGlobal } from 'emotion';

import Header from '../components/Header';
import Calculator from '../components/Calculator';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    background-color: #eee;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const appClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  label: app;
`;

const CalculatorHolder = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  label: calculator-holder;
`;

export default function App() {
  return (
    <div className={appClass}>
      <Header>Four Function Calculator</Header>
      <CalculatorHolder>
        <Calculator />
        <Calculator />
      </CalculatorHolder>
    </div>
  );
}
//
