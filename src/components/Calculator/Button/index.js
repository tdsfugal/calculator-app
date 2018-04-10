import React from 'react';
import { bool, string } from 'prop-types';
import { css } from 'react-emotion';

export default function Button({ id, name, doubleHigh, doubleWide }) {
  const height = doubleHigh ? '125px' : '45px';
  const width = doubleWide ? '150px' : '60px';

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

  const onClick = () => {
    console.log(`clicked this ${name} for computation = ${id}`);
  };

  return (
    <button className={buttonClass} onClick={onClick}>
      {name}
    </button>
  );
}

Button.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  doubleHigh: bool,
  doubleWide: bool
};

Button.defaultProps = {
  doubleHigh: false,
  doubleWide: false
};
