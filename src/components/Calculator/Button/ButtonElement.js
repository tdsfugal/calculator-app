import React from 'react';
import { bool, string, func } from 'prop-types';
import { css } from 'react-emotion';

export default function ButtonElement({
  name,
  onClick,
  doubleHigh,
  doubleWide
}) {
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

  return (
    <button className={buttonClass} onClick={onClick}>
      {name}
    </button>
  );
}

ButtonElement.propTypes = {
  name: string.isRequired,
  onClick: func.isRequired,
  doubleHigh: bool,
  doubleWide: bool
};

ButtonElement.defaultProps = {
  doubleHigh: false,
  doubleWide: false
};
