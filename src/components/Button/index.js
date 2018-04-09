import styled from 'react-emotion';

const Button = styled('div')`
  background-color: #000;
  color: white;
  height: ${props => (props.doubleHigh ? '125px' : '45px')};
  width: ${props => (props.doubleWide ? '150px' : '60px')};
  margin: 15px;
  label: button;
  text-align: center;
  border-radius: 5px;
  font-size: 25px;
  line-height: ${props => (props.doubleHigh ? '125px' : '45px')};
`;

export default Button;
