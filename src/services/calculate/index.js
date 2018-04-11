import gql from 'graphql-tag';

import getApolloClient from '../../graphql/getApolloClient';

import Calculator, { ADD, SUBTRACT, MULTIPLY, DIVIDE } from './Calculator';

const client = getApolloClient();

const getPending = gql`
  query getPending {
    computations @client {
      id
      event {
        key
        processed
      }
    }
  }
`;

const observable = client.watchQuery({
  query: getPending,
  pollInterval: 500
});

const handle = setInterval(() => {
  console.log('ping');
  observable
    .result()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      clearInterval(handle);
    });
}, 5000);

const calculator = new Calculator();

// The react buttons push events to the calculator via callbacks created in this factory
export default function calculate(name) {
  switch (name) {
    case 'C':
      return () => calculator.clearBuffer();
    case 'CE':
      return () => calculator.clearAll();
    case '0':
      return () => calculator.updateBuffer('0');
    case '1':
      return () => calculator.updateBuffer('1');
    case '2':
      return () => calculator.updateBuffer('2');
    case '3':
      return () => calculator.updateBuffer('3');
    case '4':
      return () => calculator.updateBuffer('4');
    case '5':
      return () => calculator.updateBuffer('5');
    case '6':
      return () => calculator.updateBuffer('6');
    case '7':
      return () => calculator.updateBuffer('7');
    case '8':
      return () => calculator.updateBuffer('8');
    case '9':
      return () => calculator.updateBuffer('9');
    case '.':
      return () => calculator.updateBuffer('.');
    case '+/-':
      return () => calculator.toggleSign();
    case '+':
      return () => calculator.setOperator(ADD);
    case '-':
      return () => calculator.setOperator(SUBTRACT);
    case '*':
      return () => calculator.setOperator(MULTIPLY);
    case '/':
      return () => calculator.setOperator(DIVIDE);
    case '=':
      return () => calculator.compute();
    default:
      return () => null;
  }
}
