import React from 'react';
import styled, { css } from 'react-emotion';
import { arrayOf, element } from 'prop-types';

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

export const ColumnGroup = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  label: column-group;
`;

export const RowGroup = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  label: row-group;
`;

export const Face = ({ children }) => (
  <div className={calculatorClass}>{children}</div>
);

Face.propTypes = {
  children: arrayOf(element)
};

Face.defaultProps = {
  children: null
};
