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

window.addEventListener('keydown', getKeyboardInput);
digits.forEach(digit => digit.addEventListener('click', getNumbers));
operators.forEach(operator => operator.addEventListener('click', getOperators));
ac.addEventListener('click', clear);
equal.addEventListener('click', calcResult);

function getKeyboardInput(e) {
    // let digits = /^\d+$/;
    // let digits = /^\d*\.?\d+$/;
    let digits = /^\d+$|\./;
    let operators = /\%|\/|\+|\-|\*|x/;

    // Compare user keyboard input against regex patterns and call correct function
    if (digits.test(e.key)) getNumbers(e);
    if (operators.test(e.key)) getOperators(e);

    if (e.key === 'Enter') calcResult();
    if (e.key === 'Delete') clear();
}

function getNumbers(e) {
    // Clear display if user has already done an operation and then pick a digit
    if (result !== 0) clear();

    value = `value${numberCount}`;
    if (!input[value]) input[value] = '';

    // Stop user from inserting more than one decimal point in a given number
    if (
        input[value].indexOf('.') !== -1
        && (e.key === '.' || e.target.textContent === '.')
    ) {
        return;
    }

    // User can enter digits via clicking UI or pressing keyboard
    if (e instanceof KeyboardEvent) {
        input[value] += e.key;
    } else {
        input[value] += e.target.textContent;
    }

    /**
    * Object.values return an array of object property values separated by a comma
    * Join(' ') returns an array as a string with a white space as separator
    */
    displayTop.textContent = Object.values(input).join(' ');
    console.log(input);
}

function getOperators(e){
    // Stop user from starting with an operator
    if (!input[value]) return;

    // Continue operation if user has already done an operation and then pick an operator
    if (result !== 0) {
        for (let key in input) delete input[key];
        numberCount = 1;
        operatorCount = 1;
        input.value1 = result;
        result = 0;
        displayBottom.textContent = '';
    }
    // Else start the first operation
    let operator = `operator${operatorCount}`;
    if (!input[operator]) input[operator] = '';

    // Stop user from inserting 2 operators in a row
    let inputValues = Object.values(input);
    for (let i = 0; i < inputValues.length; i++) {
        /**
         * Current operator value in loop always empty since after input[operator] = ''
         * and before input[operator] += e.key or e.target.textContent;
         * If previous element in loop is also an operator, remove empty value and return
         */
        if (inputValues[i] === '' && inputValues[i-1].includes('+')) {
            delete input[operator];
            return;
        }
    }

    if (e instanceof KeyboardEvent) {
        input[operator] += e.key;
    } else {
        input[operator] += e.target.textContent;
    }

    displayTop.textContent = Object.values(input).join(' ');
    numberCount++;
    operatorCount++;
    console.log(input);
}

function calcResult() {
    // Return an array of the object property values (i.e. numbers and operators)
    inputValues = Object.values(input);

    // Change every number in the array (i.e. every other element) to float
    inputValuesInt = inputValues.map((element, index) => {
        return (index % 2 === 0) ? parseFloat(element) : element; 
    });

    result = calc(inputValuesInt);
    displayBottom.textContent = result;
}

function calc(arr) {
    console.log(arr);

    // Insert operation result in array and remove previous & next value (e.g.  [6 + 3] => [9])
    function updateArr(arr, index, newValue) {
        arr.splice(index, 1, newValue)
        arr.splice(index + 1, 1);
        arr.splice(index - 1, 1);
    }

    // If no operation left, return result. Else, keep doing operations.
    if (arr.length === 1) return arr[0];

    // Loop through array and do multiplications, divisions, and modulo first
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*' || arr[i] === 'x' || arr[i] === '/' || arr[i] === '%') {
            resultOp = operate(arr[i-1], arr[i], arr[i+1]);
            updateArr(arr, i, resultOp)
            return calc(arr);
        }
    }
    console.log(arr);

    // Then loop again and do additions and subtractions
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+' || arr[i] === '-') {
            resultOp = operate(arr[i-1], arr[i], arr[i+1]);
            updateArr(arr, i, resultOp)
            return calc(arr);
        }
    }
    console.log(arr);

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
    } else if (operator === '%') {
        return modulus(x, y);
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

function modulus(x, y) {
    return x % y;
}