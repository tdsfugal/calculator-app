/* eslint-disable prefer-destructuring */
import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  NONE,
  DEFAULT_COMPUTATION_STATE
} from './index';

const isFloat = numString => numString.indexOf('.') !== -1;

const updateBuffer = (state, input) => {
  let buffer;
  let displayString;

  if (state.displayString === '0') {
    displayString = input === '.' ? '0.0' : input;
    buffer = parseInt(displayString, 10);
  } else
    switch (input) {
      case '.':
        // no double decimal points
        if (isFloat(state.displayString)) return state;
        displayString = state.displayString.concat('.0');
        buffer = state.buffer;
        break;

      case '0':
        // feels ok to just let the trailing zero stand
        displayString = state.displayString.concat('0');
        // numerically, ignore zeros to the right of the decimal point
        buffer = isFloat(displayString) ? state.buffer : state.buffer * 10.0;
        break;

      default:
        displayString =
          state.displayString.length > 2 &&
          state.displayString.length - 2 === state.displayString.indexOf('.0')
            ? state.displayString.replace('.0', `.${input}`)
            : state.displayString.concat(input);
        buffer = isFloat(displayString)
          ? parseFloat(displayString)
          : parseInt(displayString, 10);
    }

  return Object.assign({}, state, {
    buffer,
    displayString
  });
};

const toggleSign = state => {
  const buffer = state.buffer * -1;
  const displayString = buffer.toString();

  return Object.assign({}, state, {
    buffer,
    displayString
  });
};

const clearBuffer = state =>
  Object.assign({}, state, {
    displayString: '0',
    buffer: 0, 
  });

const clearAll = () => Object.assign({}, DEFAULT_COMPUTATION_STATE);

const setOperator = (state, operator) =>
  [ADD, SUBTRACT, MULTIPLY, DIVIDE].includes(operator)
    ? Object.assign({}, state, {
        operator,
        accumulator: state.buffer,
        displayString: '0',
        buffer: 0
      })
    : state;

const compute = state => {
  let buffer;
  switch (state.operator) {
    case ADD:
      buffer = state.accumulator + state.buffer;
      break;
    case SUBTRACT:
      buffer = state.accumulator - state.buffer;
      break;
    case MULTIPLY:
      buffer = state.accumulator * state.buffer;
      break;
    case DIVIDE: // Silent return may not be the desired response to divide by zero
      buffer = state.buffer !== 0 ? state.accumulator / state.buffer : 0;
      break;
    default:
      return state;
  }
  return Object.assign({}, state, {
    operator: NONE,
    accumulator: 0,
    buffer,
    displayString: buffer.toString()
  });
};

// This is a stateless four function calculator
export default function calculate(key, state) {
  switch (key) {
    case 'C':
      return clearBuffer(state);
    case 'CE':
      return clearAll();
    case '0':
      return updateBuffer(state, '0');
    case '1':
      return updateBuffer(state, '1');
    case '2':
      return updateBuffer(state, '2');
    case '3':
      return updateBuffer(state, '3');
    case '4':
      return updateBuffer(state, '4');
    case '5':
      return updateBuffer(state, '5');
    case '6':
      return updateBuffer(state, '6');
    case '7':
      return updateBuffer(state, '7');
    case '8':
      return updateBuffer(state, '8');
    case '9':
      return updateBuffer(state, '9');
    case '.':
      return updateBuffer(state, '.');
    case '+/-':
      return toggleSign(state);
    case '+':
      return setOperator(state, ADD);
    case '-':
      return setOperator(state, SUBTRACT);
    case '*':
      return setOperator(state, MULTIPLY);
    case '/':
      return setOperator(state, DIVIDE);
    case '=':
      return compute(state);
    default:
      return state;
  }
}
