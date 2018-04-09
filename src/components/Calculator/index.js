import React from 'react';
import styled, { css } from 'react-emotion';

import Display from '../Display';
import Button from '../Button';

const calculatorClass = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin: 50px;
  background-color: #789;
  border: solid 2px #666;
  label: calculator;
`;

const ColumnGroup = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  label: column-group;
`;

const RowGroup = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  label: row-group;
`;

export default function Calculator() {
  return (
    <div className={calculatorClass}>
      <Display value={100.0} />
      <RowGroup>
        <ColumnGroup>
          <RowGroup>
            <Button name="CE" />
            <Button name="C" />
            <Button name="+/-" />
          </RowGroup>
          <RowGroup>
            <Button name="7" />
            <Button name="8" />
            <Button name="9" />
          </RowGroup>
          <RowGroup>
            <Button name="4" />
            <Button name="5" />
            <Button name="6" />
          </RowGroup>
          <RowGroup>
            <Button name="1" />
            <Button name="2" />
            <Button name="3" />
          </RowGroup>
          <RowGroup>
            <Button name="0" doubleWide />
            <Button name="." />
          </RowGroup>
        </ColumnGroup>
        <ColumnGroup>
          <Button name="/" />
          <Button name="*" />
          <Button name="-" />
          <Button name="+" />
          <Button name="=" />
        </ColumnGroup>
      </RowGroup>
    </div>
  );
}
