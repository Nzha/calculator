const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators.display');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');
const ac = document.querySelector('#AC');
const equal = document.querySelector('#equal');

let input = {};
let numberCount = 1;
let operatorCount = 1;

digits.forEach(digit => digit.addEventListener('click', displayInput));
operators.forEach(operator => operator.addEventListener('click', displayOperator));
ac.addEventListener('click', clear);
equal.addEventListener('click', displayResult);

function displayInput(e) {
    value = `value${numberCount}`;
    if (!input[value]) {
        input[value] = '';
    }
    input[value] += e.target.textContent;

    /**
    * Object.values return an array of object property values separated by a comma
    * Join(' ') returns an array as a string with a white space as separator
    */
    displayTop.textContent = Object.values(input).join(' ');
    console.log(input);
}

function displayOperator(e){
    operator = `operator${operatorCount}`;
    if (!input[operator]) {
        input[operator] = '';
    }
    input[operator] += e.target.textContent;
    displayTop.textContent = Object.values(input).join(' ');
    console.log(input);
    numberCount++;
    operatorCount++;
}

function displayResult() {
    let result = operate(parseInt(input.value1), input.operator1, parseInt(input.value2));
    console.log(result);
    displayBottom.textContent = result;
}

function clear() {
    // Clear input object
    for (let key in input) delete input[key];
    numberCount = 1;
    operatorCount = 1;
    displayTop.textContent = '';
    displayBottom.textContent = '';
}

function operate(x, operator, y) {
    if (operator === '+') {
        return add(x, y);
    } else if (operator === '-') {
        return subtract(x, y);
    } else if (operator === 'x' || operator === '*') {
        return multiply(x, y);
    } else if (operator === '/') {
        return divide(x, y);
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}