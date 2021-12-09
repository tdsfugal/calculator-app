import React from 'react';
import { string } from 'prop-types';

import Display from '../Display';
import Button from '../Button';

import { Face, ColumnGroup, RowGroup } from '../Face';

const CalculatorA = ({ id }) => (
  <Face>
    <Display id={id} />
    <ColumnGroup>
      <RowGroup>
        <Button id={id} name="CE" />
        <Button id={id} name="C" />
        <Button id={id} name="+/-" />
        <Button id={id} name="/" />
      </RowGroup>
      <RowGroup>
        <Button id={id} name="7" />
        <Button id={id} name="8" />
        <Button id={id} name="9" />
        <Button id={id} name="*" />
      </RowGroup>
      <RowGroup>
        <Button id={id} name="4" />
        <Button id={id} name="5" />
        <Button id={id} name="6" />
        <Button id={id} name="-" />
      </RowGroup>
      <RowGroup>
        <Button id={id} name="1" />
        <Button id={id} name="2" />
        <Button id={id} name="3" />
        <Button id={id} name="+" />
      </RowGroup>
      <RowGroup>
        <Button id={id} name="0" doubleWide />
        <Button id={id} name="." />
        <Button id={id} name="=" />
      </RowGroup>
    </ColumnGroup>
  </Face>
);

CalculatorA.propTypes = {
  id: string.isRequired
};

export default CalculatorA;
