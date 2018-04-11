import {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  DEFAULT_COMPUTATION_STATE
} from './index';

const operators = [ADD, SUBTRACT, MULTIPLY, DIVIDE];

const updateBuffer = (input = null, state) => {
  const isFloat = state.bufferString.indexOf('.') !== -1;
  if (input === '.' && isFloat) return state; // No second decimal point

  const bufferString = input
    ? state.bufferString.concat(input)
    : state.bufferString;

  const newNumber = isFloat
    ? parseFloat(bufferString)
    : parseInt(bufferString, 10);

  return Object.assign({}, ...state, {
    buffer: state.bufferNegative ? newNumber * -1 : newNumber,
    bufferString
  });
};

const toggleSign = state =>
  Object.assign({}, ...state, {
    bufferNegative: !state.bufferNegative
  }).updateBuffer();

const clearBuffer = state =>
  Object.assign({}, ...state, {
    bufferString: '',
    buffer: 0,
    bufferNegative: false
  });

const clearAll = () => Object.assign({}, ...DEFAULT_COMPUTATION_STATE);

const setOperator = (operator, state) =>
  operators.includes(operator)
    ? Object.assign({}, ...state, {
        operator,
        accumulator: state.buffer
      }).clearBuffer()
    : state;

const setBuffer = (number, state) =>
  Object.assign({}, ...state, {
    buffer: number,
    bufferString: number.toString()
  });

const compute = state => {
  switch (state.operator) {
    case ADD:
      return setBuffer(state.accumulator + state.buffer);
    case SUBTRACT:
      return setBuffer(state.accumulator - state.buffer);
    case MULTIPLY:
      return setBuffer(state.accumulator * state.buffer);
    case DIVIDE:
      return state.buffer === 0
        ? state // Silent return may not be the desired response to divide by zero
        : setBuffer(state.accumulator / state.buffer);
    default:
      return state;
  }
};

// This is a stateless four function calculator
export default function calculate(key, state) {
  switch (key) {
    case 'C':
      return clearBuffer(state);
    case 'CE':
      return clearAll();
    case '0':
      return updateBuffer('0', state);
    case '1':
      return updateBuffer('1', state);
    case '2':
      return updateBuffer('2', state);
    case '3':
      return updateBuffer('3', state);
    case '4':
      return updateBuffer('4', state);
    case '5':
      return updateBuffer('5', state);
    case '6':
      return updateBuffer('6', state);
    case '7':
      return updateBuffer('7', state);
    case '8':
      return updateBuffer('8', state);
    case '9':
      return updateBuffer('9', state);
    case '.':
      return updateBuffer('.', state);
    case '+/-':
      return toggleSign(state);
    case '+':
      return setOperator(ADD, state);
    case '-':
      return setOperator(SUBTRACT, state);
    case '*':
      return setOperator(MULTIPLY, state);
    case '/':
      return setOperator(DIVIDE, state);
    case '=':
      return compute(state);
    default:
      return state;
  }
}
