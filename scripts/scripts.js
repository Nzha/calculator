const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators.display');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');
const correct = document.querySelector('#C');
const ac = document.querySelector('#AC');
const equal = document.querySelector('#equal');

// Regex to validate keyboard input
const digit = new RegExp(/^\d+$|\./);
const operator = new RegExp(/\%|\/|\+|\-|\*|x/);
const back = new RegExp(/^Backspace$/);
const del = new RegExp(/^Delete$/);
const enter = new RegExp(/^Enter$/);
const validInput = new RegExp(
    digit.source + '|' + operator.source + '|' + back.source + '|' + del.source + '|' + enter.source
);

let input = {};
let numberCount = 1;
let operatorCount = 1;
let result = 0;

window.addEventListener('keydown', (e) => {
    getKeyboardInput(e);
    addStyle(e);
});
window.addEventListener('keyup', removeStyle);
digits.forEach(digit => digit.addEventListener('click', getNumbers));
operators.forEach(operator => operator.addEventListener('click', getOperators));
correct.addEventListener('click', backspace);
ac.addEventListener('click', clear);
equal.addEventListener('click', calcResult);

function getKeyboardInput(e) {
    // Compare user keyboard input against regex patterns and call correct function
    if (digit.test(e.key)) getNumbers(e);
    if (operator.test(e.key)) getOperators(e);

    if (e.key === 'Enter') calcResult();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Delete') clear();
}

function getNumbers(e) {
    // Clear display if user has already done an operation and then pick a digit
    if (result !== 0) clear();

    /**
    * Start a new operand if last element in object is not a number such as an operator
    * or is undefined since the very first element will be undefined
    * or is not equal to 'NaN' in case user starts with a decimal point
    */
    let inputFloats = strToFloats(input);
    lastEl = lastElement(inputFloats);
    if (isNaN(lastEl) && lastEl !== undefined && !Number.isNaN(lastEl)) numberCount += 1;

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

    displayBottom.textContent = Object.values(input).join(' ');
    console.log(input);
}

function getOperators(e){
    // Stop user from starting with an operator or inserting 2 operators in a row
    let inputFloats = strToFloats(input);
    lastEl = lastElement(inputFloats);
    if (isNaN(lastEl)) return;

    // Continue operation if user has already done an operation and then pick an operator
    if (result !== 0) {
        for (let key in input) delete input[key];
        numberCount = 1;
        operatorCount = 1;

        // Convert result back to string to use 'includes' function below
        input.value1 = resultRounded.toString();

        result = 0;
        displayTop.textContent = '';
    }
    // Else start the first operation
    let operator = `operator${operatorCount}`;
    if (!input[operator]) input[operator] = '';

    if (e instanceof KeyboardEvent) {
        input[operator] += e.key;
    } else {
        input[operator] += e.target.textContent;
    }

    displayBottom.textContent = Object.values(input).join(' ');
    operatorCount += 1;
    console.log(input);
}

function calcResult() {
    // Return if operation ends with an operator instead of a digit
    let inputFloats = strToFloats(input);
    lastEl = lastElement(inputFloats);
    if (isNaN(lastEl)) return;

    displayTop.textContent = Object.values(input).join(' ');
    result = calcOperations(inputFloats);
    resultRounded = Math.round((result + Number.EPSILON) * 100) / 100;
    displayBottom.textContent = resultRounded;
}

function calcOperations(arr) {
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
            return calcOperations(arr);
        }
    }
    console.log(arr);

    // Then loop again and do additions and subtractions
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+' || arr[i] === '-') {
            resultOp = operate(arr[i-1], arr[i], arr[i+1]);
            updateArr(arr, i, resultOp)
            return calcOperations(arr);
        }
    }
    console.log(arr);
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const modulus = (x, y) => x % y;

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

function backspace() {
    // Clear all display instead if a result is already displayed
    if (result !== 0) clear();

    const operators = ['+', '-', '/', 'x', '*'];
    let inputValues = Object.values(input);

    // Loop through input values from end and remove first element then break
    for (let i = inputValues.length - 1; i >= 0; i--) {

        // Remove object property if empty and decrease count
        if (inputValues[i].slice(0, -1).length === 0) {
            if (operators.some(el => inputValues[i].includes(el))) {
                delete input[`operator${operatorCount-1}`];
                operatorCount > 1 ? operatorCount-- : false;
            } else {
                delete input[`value${numberCount}`];
                numberCount > 1 ? numberCount-- : false;
            }
            break;
        }
        // Remove first element encountered from end
        input[`value${numberCount}`] = inputValues[i].slice(0, -1);
        break;
    }

    console.log(input);
    displayBottom.textContent = Object.values(input).join(' ');
}

function clear() {
    // Clear input object
    for (let key in input) delete input[key];

    numberCount = 1;
    operatorCount = 1;
    result = 0;
    displayTop.textContent = '';
    displayBottom.textContent = '0';
}

function strToFloats(object) {
    // Return an array of the object property values (i.e. operands and operators)
    objectValues = Object.values(object);

    // Convert operands in array (i.e. every other element) from string to float
    objectValuesFloats = objectValues.map((element, index) => {
        return (index % 2 === 0) ? parseFloat(element) : element; 
    });

    return objectValuesFloats;
}

function lastElement(arr) {
    return arr[arr.length - 1];
}

function defineClassName(e) {
    if (digit.test(e.key)) className = 'digits-pressed';
    if (operator.test(e.key)) className = 'operators-pressed';
    if (back.test(e.key)) className = 'C-pressed';
    if (del.test(e.key)) className = 'AC-pressed';
    if (enter.test(e.key)) className = 'equal-pressed';
}

function addStyle(e) {
    if (!validInput.test(e.key)) return;
    defineClassName(e);

    // '*' means 'data-key' attribute includes 'e.key' instead of equals to 'e.key'
    document.querySelector(`button[data-key*="${e.key}"]`).classList.add(className);
}

function removeStyle(e) {
    if (!validInput.test(e.key)) return;
    defineClassName(e);
    document.querySelector(`button[data-key*="${e.key}"]`).classList.remove(className);
}