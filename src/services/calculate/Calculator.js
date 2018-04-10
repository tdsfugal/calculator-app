export const NONE = 'none';
export const ADD = 'add';
export const SUBTRACT = 'subtract';
export const MULTIPLY = 'multiply';
export const DIVIDE = 'divide';

const operators = [ADD, SUBTRACT, MULTIPLY, DIVIDE];

export default class Calculator {
  constructor() {
    this.bufferString = '';
    this.bufferNegative = false;
    this.buffer = 0;
    this.accumulator = 0;
    this.operator = NONE;
  }

  setBuffer(number) {
    this.buffer = number;
    this.bufferString = number.toString();
  }

  updateBuffer(input = null) {
    const isFloat = this.bufferString.indexOf('.') !== -1;

    if (input) {
      if (input === '.' && isFloat) return; // No second decimal point
      this.bufferString = this.bufferString.concat(input);
    }

    const newNumber = isFloat
      ? parseFloat(this.bufferString)
      : parseInt(this.bufferString, 10);

    this.buffer = this.bufferNegative ? newNumber * -1 : newNumber;
    this.reportChange();
  }

  toggleSign() {
    this.bufferNegative = !this.bufferNegative;
    this.updateBuffer();
  }

  getBuffer() {
    return this.buffer;
  }

  getAccumulator() {
    return this.accumulator;
  }

  clearBuffer() {
    this.bufferString = '';
    this.buffer = 0;
    this.bufferNegative = false;
    this.reportChange();
  }

  clearAll() {
    this.accumulator = 0;
    this.operator = NONE;
    this.clearBuffer();
  }

  setOperator(operator) {
    if (operators.includes(operator)) {
      this.operator = operator;
      this.accumulator = this.buffer;
      this.clearBuffer();
    }
  }

  compute() {
    switch (this.operator) {
      case ADD:
        this.setBuffer(this.accumulator + this.buffer);
        break;
      case SUBTRACT:
        this.setBuffer(this.accumulator - this.buffer);
        break;
      case MULTIPLY:
        this.setBuffer(this.accumulator * this.buffer);
        break;
      case DIVIDE:
        if (this.buffer === 0) return; // Silent return may not be the desired response to divide by zero
        this.setBuffer(this.accumulator / this.buffer);
        break;
      default:
        break;
    }
    this.reportChange();
  }

  reportChange() {
    console.log(this.buffer);
  }
}
