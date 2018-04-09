import React from 'react';

import styled, { css } from 'react-emotion';

const DisplayStyle = css`
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

export default function Display(props) {
  return (
    <div className={DisplayStyle}>
      <Result>{props.value}</Result>
    </div>
  );
}
