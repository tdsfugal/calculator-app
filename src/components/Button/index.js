import React from 'react';
import { bool, string } from 'prop-types';
import { css } from 'react-emotion';

import calculate from '../../services/calculate';

export default function Button(props) {
  const height = props.doubleHigh ? '125px' : '45px';
  const width = props.doubleWide ? '150px' : '60px';

  const buttonClass = css`
    background-color: #000;
    color: white;
    height: ${height};
    width: ${width};
    margin: 15px;
    text-align: center;
    border-radius: 5px;
    font-size: 25px;
    line-height: ${height};
    label: button;
  `;

  return (
    <div className={buttonClass} onClick={calculate(props.name)}>
      {props.name}
    </div>
  );
}

Button.propTypes = {
  doubleHigh: bool,
  doubleWide: bool,
  name: string,
};

Button.defaultProps = {
  doubleHigh: false,
  doubleWide: false,
  name: '',
};
