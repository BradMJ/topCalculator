let currentNum = "";
let previousNum = "";
let operator = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const decimalButton = document.querySelector('#decimalKey');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

equalsButton.addEventListener("click", evaluate);
deleteButton.addEventListener("click", deleteNum);
allClearButton.addEventListener("click", allClear);
decimalButton.addEventListener("click", appendDecimal);

numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
    );

operationButtons.forEach((button) => 
    button.addEventListener("click", () => setOperation(button.textContent))
    );

function appendNumber(number) {
    if (currentOperandTextElement.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperandTextElement.textContent += number;
};

function resetScreen() {
    currentOperandTextElement.textContent = '';
    shouldResetScreen = false;
}

function setOperation(op) {
    if (operator !== null) {
        evaluate();
    }
    currentNum = currentOperandTextElement.textContent;
    operator = op;
    previousOperandTextElement.textContent = `${currentNum} ${operator}`;
    shouldResetScreen = true;
}

function appendDecimal() {
    if (shouldResetScreen) resetScreen();
    if (currentOperandTextElement.textContent === "") {
        currentOperandTextElement.textContent = "0"; 
    }
    if (currentOperandTextElement.textContent.includes(".")) return;
    currentOperandTextElement.textContent += ".";
}

function evaluate() {
    if (operator === null || shouldResetScreen) {
        return;
    }
    if (operator === "÷" && currentOperandTextElement.textContent === 0) {
        alert("You can't divide by 0!");
        return;
    }
    previousNum = currentOperandTextElement.textContent;
    currentOperandTextElement.textContent = roundResult(operate(operator, currentNum, previousNum));
    previousOperandTextElement.textContent = `${currentNum} ${operator} ${previousNum} =`
    operator = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function allClear() {
    currentOperandTextElement.textContent = '0';
    previousOperandTextElement.textContent = '';
    currentNum = 0;
    previousNum = 0;
    operator = null;
}

function deleteNum() {
    currentOperandTextElement.textContent = currentOperandTextElement.textContent
    .toString()
    .slice(0, -1);
}

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "÷":
            if (b === 0) {
                previousNum = null;
            } else {
                return divide(a, b);
            }
            break;
        case "x":
            return multiply(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "+":
            return add(a, b);
            break;
        default:
            return null;
    };
};
