import React from 'react';
import styled, { css } from 'react-emotion';

import Display from '../Display';
import Button from '../Button';

const calculatorStyles = css`
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
    <div className={calculatorStyles}>
      <Display value={100.0} />
      <RowGroup>
        <ColumnGroup>
          <RowGroup>
            <Button onClick={() => console.log('Clicked C')}>C</Button>
            <Button onClick={() => console.log('Clicked +/-')}>+/-</Button>
            <Button onClick={() => console.log('Clicked /')}>/</Button>
          </RowGroup>
          <RowGroup>
            <Button onClick={() => console.log('Clicked 7')}>7</Button>
            <Button onClick={() => console.log('Clicked 8')}>8</Button>
            <Button onClick={() => console.log('Clicked 9')}>9</Button>
          </RowGroup>
          <RowGroup>
            <Button onClick={() => console.log('Clicked 4')}>4</Button>
            <Button onClick={() => console.log('Clicked 5')}>5</Button>
            <Button onClick={() => console.log('Clicked 6')}>6</Button>
          </RowGroup>
          <RowGroup>
            <Button onClick={() => console.log('Clicked 1')}>1</Button>
            <Button onClick={() => console.log('Clicked 2')}>2</Button>
            <Button onClick={() => console.log('Clicked 3')}>3</Button>
          </RowGroup>
          <RowGroup>
            <Button doubleWide onClick={() => console.log('Clicked 0')}>
              0
            </Button>
            <Button onClick={() => console.log('Clicked .')}>.</Button>
          </RowGroup>
        </ColumnGroup>
        <ColumnGroup>
          <Button onClick={() => console.log('Clicked *')}>*</Button>
          <Button onClick={() => console.log('Clicked -')}>-</Button>
          <Button onClick={() => console.log('Clicked +')}>+</Button>
          <Button doubleHigh onClick={() => console.log('Clicked =')}>
            =
          </Button>
        </ColumnGroup>
      </RowGroup>
    </div>
  );
}
