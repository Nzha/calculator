const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators.display');
const displayTop = document.querySelector('.display-top');
const displayBottom = document.querySelector('.display-bottom');
const ac = document.querySelector('#AC');
const equal = document.querySelector('#equal');

let input = {};
// let input = [];
let numberCount = 1;
let operatorCount = 1;
let result = 0;



let myArray = [];
myArray.push(input);



window.addEventListener('keydown', getKeyboardInput);

digits.forEach(digit => digit.addEventListener('click', getDigits));
operators.forEach(operator => operator.addEventListener('click', getOperators));
ac.addEventListener('click', clear);
equal.addEventListener('click', calcResult);

function getKeyboardInput(e) {
    let digits = /^\d+$/;
    let operators = /\%|\/|\+|\-|\*|x/;

    // Compare user keyboard input against regex patterns and call correct function
    if (digits.test(e.key)) getDigits(e);
    if (operators.test(e.key)) getOperators(e);

    if (e.key === 'Enter') calcResult();
    if (e.key === 'Delete') clear();
}

function getDigits(e) {
    // Clear display if user has already done an operation and then pick a digit
    if (result !== 0) clear();

    value = `value${numberCount}`;
    if (!input[value]) input[value] = '';

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



    
    // for (item in input) {
    //     // let test = input.indexOf('+');
    //     // console.log('test');

    //     // pos = myArray.map(function(e) { console.log('test') }).indexOf('operator1');
    //     // console.log(pos);

    //     console.log(item);
    // }

    // for (let i = 0; i < Object.keys(input).length; i++) {
    //     console.log(Object.keys(input)[i]);
    //     if (Object.keys(input)[i].includes('operator')) {
    //         console.log('works');
    //     }
    // }

    // for (let key in input) {
    //     console.log(key)
    //     // if (key.includes('operator')) {
    //     //     console.log('operator!');
    //     // }
    // }


    // let keys = Object.keys(input).sort();
    // let test = keys.indexOf('operator')
    // console.log(test);

    // console.log(operatorCount);
    // console.log(`operator${operatorCount}`);
    // console.log(input[`operator${operatorCount-1}`]);

    // console.log(operatorCount);
    // if (`operator${operatorCount-1}` in input) {
    //     console.log('works');
    // }

    // for (let i = 0; i < myArray.length; i++) {
    //     console.log(`Test: ${myArray[0]}`);
    // }



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
    operator = `operator${operatorCount}`;
    if (!input[operator]) input[operator] = '';

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