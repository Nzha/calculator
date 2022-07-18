const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators.display');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');
const ac = document.querySelector('#AC');
const equal = document.querySelector('#equal');

let input = {};
let numberCount = 1;
let operatorCount = 1;
let result = 0;

digits.forEach(digit => digit.addEventListener('click', displayInput));
operators.forEach(operator => operator.addEventListener('click', displayOperator));
ac.addEventListener('click', clear);
equal.addEventListener('click', displayResult);

function displayInput(e) {
    // Clear display if user has already done an operation and then pick a digit
    if (result !== 0) clear();

    value = `value${numberCount}`;
    if (!input[value]) input[value] = '';
    input[value] += e.target.textContent;

    /**
    * Object.values return an array of object property values separated by a comma
    * Join(' ') returns an array as a string with a white space as separator
    */
    displayTop.textContent = Object.values(input).join(' ');
    console.log(input);
}

function displayOperator(e){
    // Stop user from starting with an operator
    if (!input[value]) return;

    // Continue operation if user has already done an operation and then pick an operator
    if (result !== 0) {
        // input.value1 = result;
        // displayTop.textContent = result;
        // displayBottom.textContent = '';
        // console.log(input);
        for (let key in input) delete input[key];
        numberCount = 1;
        operatorCount = 1;
        input.value1 = result;
        result = 0;
        operator = `operator${operatorCount}`;
        if (!input[operator]) input[operator] = '';
        input[operator] += e.target.textContent;
        displayTop.textContent = Object.values(input).join(' ');
        displayBottom.textContent = '';
        console.log(input);
        console.log(result)
        numberCount++;
        operatorCount++;
    // Else start the first operation
    } else {
        operator = `operator${operatorCount}`;
        if (!input[operator]) input[operator] = '';
        input[operator] += e.target.textContent;
        displayTop.textContent = Object.values(input).join(' ');
        console.log(input);
        numberCount++;
        operatorCount++;
    }
}

function displayResult() {
    result = operate(parseInt(input.value1), input.operator1, parseInt(input.value2));
    displayBottom.textContent = result;
    console.log(result);
}

function clear() {
    // Clear input object
    for (let key in input) delete input[key];
    numberCount = 1;
    operatorCount = 1;
    result = 0;
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