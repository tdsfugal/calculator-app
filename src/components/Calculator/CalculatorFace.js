import React from 'react';
import styled, { css } from 'react-emotion';
import { string } from 'prop-types';

import Display from './Display';
import Button from './Button';

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

const CalculatorFace = ({ id }) => (
  <div className={calculatorClass}>
    <Display id={id} />
    <RowGroup>
      <ColumnGroup>
        <RowGroup>
          <Button id={id} name="CE" />
          <Button id={id} name="C" />
          <Button id={id} name="+/-" />
        </RowGroup>
        <RowGroup>
          <Button id={id} name="7" />
          <Button id={id} name="8" />
          <Button id={id} name="9" />
        </RowGroup>
        <RowGroup>
          <Button id={id} name="4" />
          <Button id={id} name="5" />
          <Button id={id} name="6" />
        </RowGroup>
        <RowGroup>
          <Button id={id} name="1" />
          <Button id={id} name="2" />
          <Button id={id} name="3" />
        </RowGroup>
        <RowGroup>
          <Button id={id} name="0" doubleWide />
          <Button id={id} name="." />
        </RowGroup>
      </ColumnGroup>
      <ColumnGroup>
        <Button id={id} name="/" />
        <Button id={id} name="*" />
        <Button id={id} name="-" />
        <Button id={id} name="+" />
        <Button id={id} name="=" />
      </ColumnGroup>
    </RowGroup>
  </div>
);

CalculatorFace.propTypes = {
  id: string.isRequired
};

export default CalculatorFace;
