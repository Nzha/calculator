// const displayBtns = document.querySelectorAll('.display');
const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const displayTop = document.querySelector('.display-top');
const ac = document.querySelector('#AC');
const equal = document.querySelector('#equal');

let input = {};
let numberCount = 0;
let operatorCount = 0;

digits.forEach(digit => digit.addEventListener('click', displayInput));
operators.forEach(operator => operator.addEventListener('click', displayOperator));
// displayBtns.forEach(displayBtn => displayBtn.addEventListener('click', displayInput));
ac.addEventListener('click', clear);
equal.addEventListener('click', displayResult);

function displayInput(e) {
        value = `value${numberCount}`;
        if (!input[value]) {
            input[value] = '';
        }
        input[value] += e.target.textContent;
        displayTop.textContent = input[value];
        console.log(input);
}

function displayOperator(e){
    operator = `operator${operatorCount}`;
    if (!input[operator]) {
        input[operator] = '';
    }
    input[operator] += e.target.textContent;
    displayTop.textContent += input[operator];
    console.log(input);
    numberCount++;
    operatorCount++;
}

function clear() {
    input = '';
    displayTop.textContent = '';
}

function displayResult() {
    console.log(parseInt(displayTop.textContent));
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