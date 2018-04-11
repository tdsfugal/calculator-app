import { ADD, SUBTRACT, MULTIPLY, DIVIDE, DEFAULT_COMPUTATION } from './index';

const operators = [ADD, SUBTRACT, MULTIPLY, DIVIDE];

const updateBuffer = (input = null, comp) => {
  const isFloat = comp.bufferString.indexOf('.') !== -1;
  if (input === '.' && isFloat) return comp; // No second decimal point

  const bufferString = input
    ? comp.bufferString.concat(input)
    : comp.bufferString;

  const newNumber = isFloat
    ? parseFloat(bufferString)
    : parseInt(bufferString, 10);

  return Object.assign({}, ...comp, {
    buffer: comp.bufferNegative ? newNumber * -1 : newNumber,
    bufferString
  });
};

const toggleSign = comp =>
  Object.assign({}, ...comp, {
    bufferNegative: !comp.bufferNegative
  }).updateBuffer();

const clearBuffer = comp =>
  Object.assign({}, ...comp, {
    bufferString: '',
    buffer: 0,
    bufferNegative: false
  });

const clearAll = () => Object.assign({}, ...DEFAULT_COMPUTATION);

const setOperator = (operator, comp) =>
  operators.includes(operator)
    ? Object.assign({}, ...comp, {
        operator,
        accumulator: comp.buffer
      }).clearBuffer()
    : comp;

const setBuffer = (number, comp) =>
  Object.assign({}, ...comp, {
    buffer: number,
    bufferString: number.toString()
  });

const compute = comp => {
  switch (comp.operator) {
    case ADD:
      return setBuffer(comp.accumulator + comp.buffer);
    case SUBTRACT:
      return setBuffer(comp.accumulator - comp.buffer);
    case MULTIPLY:
      return setBuffer(comp.accumulator * comp.buffer);
    case DIVIDE:
      return comp.buffer === 0
        ? comp // Silent return may not be the desired response to divide by zero
        : setBuffer(comp.accumulator / comp.buffer);
    default:
      return comp;
  }
};

// This is a stateless four function calculator
export default function calculate(key, computation) {
  switch (key) {
    case 'C':
      return clearBuffer(computation);
    case 'CE':
      return clearAll();
    case '0':
      return updateBuffer('0', computation);
    case '1':
      return updateBuffer('1', computation);
    case '2':
      return updateBuffer('2', computation);
    case '3':
      return updateBuffer('3', computation);
    case '4':
      return updateBuffer('4', computation);
    case '5':
      return updateBuffer('5', computation);
    case '6':
      return updateBuffer('6', computation);
    case '7':
      return updateBuffer('7', computation);
    case '8':
      return updateBuffer('8', computation);
    case '9':
      return updateBuffer('9', computation);
    case '.':
      return updateBuffer('.', computation);
    case '+/-':
      return toggleSign(computation);
    case '+':
      return setOperator(ADD, computation);
    case '-':
      return setOperator(SUBTRACT, computation);
    case '*':
      return setOperator(MULTIPLY, computation);
    case '/':
      return setOperator(DIVIDE, computation);
    case '=':
      return compute(computation);
    default:
      return computation;
  }
}
