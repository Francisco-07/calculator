// selectors
const numberButtons = document.querySelectorAll("[data-number]");
const screen = document.querySelector("[data-screen]");
const last = document.querySelector("[data-last]");
const clearOperations = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const point = document.querySelector("[data-point]");
const equalsButton = document.querySelector("[data-equals]");

// variables
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

// event listeners
deleteButton.addEventListener("click", deleteNumber);
equalsButton.addEventListener("click", evaluate);
point.addEventListener("click", appendPoint);
clearOperations.addEventListener("click", clear);

numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
);




// append functions
function appendNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen) resetScreen();
    screen.textContent += number;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(point.textContent)) return;
    screen.textContent += point.textContent;
}

// set operation and evaluate

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && screen.textContent === "0") {
        alert("You can't divide by 0!");
        clear();
        return;
    }
    secondOperand = screen.textContent;
    screen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

// reset
function clear() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function resetScreen() {
    shouldResetScreen = false;
    screen.textContent = "";
}

// delete
function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}


// operations

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// operate

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "−":
            return substract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}