// Global variable for holding value
let holdValue = null;
let nextOp = null;

// All calculator operations and operate to redirect
const add = (function (a, b) {
    return a + b;
});

const subtract = (function (a, b) {
    return a - b;
});

const multiply = (function(a, b) {
    return a * b;
});

const divide = (function(a, b) {
    if (b == 0) { return 'err'; }
    return a / b;
});

const operate = (function(opp, a, b) {
    a = Number(a);
    b = Number(b);
    switch (opp) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            return 'err';
    }
});

// Updates the display value
const updateDisplay = (function(value, button) {
    const display = document.querySelector('#calc-display');
    updateValues(display);
    if (value == '.' && display.textContent.includes('.')) {
        return;
    }
    if (display.textContent == '0' && value != '.') {
        display.textContent = value;
        return;
    }
    display.textContent = display.textContent.concat(value);
});

/* A helper function to set and reset variables and displays 
   around either end of operations */
const updateValues = (function(display) {
    if (nextOp != null) {
        holdValue = display.textContent.concat(nextOp);
        display.textContent = '0';
        nextOp = null;
    }
    if (holdValue == '?' && nextOp == null) {
        holdValue = null;
        display.textContent = 0;
    }
});

// Handles running equals operations
const equals = (function() {
    if (holdValue == null) { return; }
    const op = holdValue.charAt(holdValue.length - 1);
    const first = holdValue.slice(0, -1);
    const display = document.querySelector('#calc-display');
    display.textContent = operate(op, first, display.textContent);
    holdValue = '?';
});

// All button bindings below to follow:

// Operation Buttons
document.querySelectorAll('.button-func').forEach((button) => {
    button.addEventListener('click', (e) => {
        nextOp = e.target.textContent;
    });
});

// Equals Button
document.querySelector('#equal').addEventListener('click', () => {
    equals();
});

// Clear Button
document.querySelector('#clear').addEventListener('click', (e) => {    
    if (holdValue != null) {
        holdValue = null;
        return;
    }
    document.querySelector('#calc-display').textContent = '0';
});

// Binds all numbered buttons as well as the decimal
document.querySelectorAll('.button-num').forEach((button) => {
    button.addEventListener('click', (e) => {
        updateDisplay(e.target.textContent, button);
    });
});

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate,
};