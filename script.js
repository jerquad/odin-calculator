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
    if (b == 0) { return 'NO WAY!'; }
    return a / b;
});

const mod = (function(a, b) {
    return a % b;
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
        case '÷':
            return divide(a,b);
        case '/':
            return divide(a,b);
        case '%':
            return mod(a,b);
        default:
            return 'err';
    }
});

/*  Updates the display value. sets limit for characters and 
    disallows more than one decimal at a time */
const updateDisplay = (function(value) {
    const charLimit = 9;
    const display = document.querySelector('#calc-display');
    if (display.textContent.length == charLimit) { return; }
    if (value == '.' && display.textContent.includes('.')) {
        return;
    }
    if (display.textContent == '0' && value != '.') {
        display.textContent = value;
        return;
    }
    display.textContent = display.textContent.concat(value);
});

// Deletes last char added, clears if after operation, sets empty display to '0'
const backSpace = (function() {
    let display = document.querySelector('#calc-display');
    if (holdValue == '?') { return clear() };
    if (display.textContent.length == 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
});

// Resets calculator to full refresh 
const clear = (function() {
    holdValue = null;
    nextOp = null;
    document.querySelector('#calc-display').textContent = '0';
});

/*  Parses variables and runs operations, edits return value to fit/limits,
    all operations are tacked to the end of the held variable */
const equals = (function() {
    if (holdValue == null || nextOp == '?') { return; }
    let solution = operate(holdValue.charAt(holdValue.length - 1),
        holdValue.slice(0, -1),
        document.querySelector('#calc-display').textContent);
    // size limits
    if (solution.toString().length > 9) {
        solution = solution.toExponential(3);
    }
    if (solution >= 1e+100) { solution = 'TOO MUCH!'}
    return solution;
});

// All button bindings and paired helper functions as follows:

// Operation Buttons
const getOp = (function(op) {
    let display = document.querySelector('#calc-display').textContent;
    if (display == 'hello') { clear(); }
    if (display == 'NO WAY!' || display =='TOO MUCH!') { clear(); }
    if (holdValue != null) {
        nextOp = null;
        document.querySelector('#calc-display').textContent = equals();
        holdValue = null;
    }
    nextOp = op;
});

document.querySelectorAll('.button-func').forEach((button) => {
    button.addEventListener('click', (e) => {
        getOp(e.target.textContent);
    });
});

// Equals Button
const eqButton = (function () {
    let display = document.querySelector('#calc-display');
    if (display.textContent == 'hello') { 
        clear();
        return;
    }
    nextOp = null;
    display.textContent = equals();
    holdValue = null;
    nextOp = '?';
});
document.querySelector('#equal').addEventListener('click', () => {
    eqButton();
});

// Clear Button
document.querySelector('#clear').addEventListener('click', (e) => {    
    clear()
});

// Number Buttons
const getNum = (function(num) {
    let display = document.querySelector('#calc-display').textContent;
    if (display == 'hello') { clear(); }
    if (nextOp == '?' && holdValue == null) {
        clear();
    } else if (nextOp == '?') {
        display = '0';
        nextOp = null;
    }
    if (nextOp != null) {
        holdValue = display.concat(nextOp);        
        nextOp = '?';
        document.querySelector('#calc-display').textContent = '0';
    }
    updateDisplay(num);    
});

document.querySelectorAll('.button-num').forEach((button) => {
    button.addEventListener('click', (e) => {
        getNum(e.target.textContent);
    });
});

// Positive/Negative Button
const posNeg = (function() {
    const display = document.querySelector('#calc-display');
    if (Number(display.textContent) == 0) { return; }
    if (display.textContent.charAt(0) == '-') {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = '-' + display.textContent;
    }
});

document.querySelector('#pos-neg').addEventListener('click', (e) => {
    posNeg();
});


// Keyboard event bindings
document.addEventListener('keydown', (e) => {
    document.querySelectorAll('.disable-button').forEach((button) => {
        button.disabled = true;
    })
    const ops = [`+`, `-`, `*`, `/`, `%`];
    if ((e.key >= 0 && e.key < 10) || e.key == '.') {
        getNum(e.key);
    } else if (ops.includes(e.key)) {
        getOp(e.key);
    } else if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        eqButton();
    } else if (e.key == 'Backspace' ) {
        backSpace();
    } else if (e.key == 'Delete') {
        clear();
    } else if (e.key == '`') {
        posNeg();
    }
});
['keyup', 'click'].forEach((action) => {
    document.addEventListener(action, (e) => {
        document.querySelectorAll('.disable-button').forEach((button) => {
            button.disabled = false;
        })
    });    
})
 
