const digits = document.querySelectorAll('.digits');
const displayTop = document.querySelector('.display-top');

digits.forEach(digit => digit.addEventListener('click', displayDigits));

function displayDigits(e) {
    console.log(e.target.textContent);
    displayTop.textContent += e.target.textContent;
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