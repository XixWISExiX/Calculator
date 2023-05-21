import { body } from "./DOMref.js";

function application() {
  const buttons = body.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", buttonSelection);
  });
}

let calculator = (function () {
  let num1 = "";
  let operator = "";
  let num2 = "";
  return { num1, operator, num2 };
})();

// TODO test
function buttonSelection() {
  let part = this.className;
  if (part === "number") {
    numberChange(this.textContent);
  }
  if (isOperator(part)) {
    calculator.operator = part;
  }
  if (part === "equal") {
    equalButton();
  }
  if (part === "clear") {
    clearButton();
  }
}

function numberChange(text) {
  if (isOperator(calculator.operator)) {
    calculator.num2 += text;
  } else {
    calculator.num1 += text;
  }
}

function equalButton() {
  const display = body.getElementsByClassName("displayLower");
  let result = operate(calculator.num1, calculator.operator, calculator.num2);
  display[0].textContent = result;
}

function clearButton() {
  calculator.num1 = "";
  calculator.operator = "";
  calculator.num2 = "";
  const display = body.getElementsByClassName("displayLower");
  display[0].textContent = "";
}

function isOperator(part) {
  if (part === "addition") return true;
  if (part === "subtraction") return true;
  if (part === "multiplcation") return true;
  if (part === "division") return true;
  return false;
}

function operate(num1, operator, num2) {
  if (operator === "addition") return add(num1, num2);
  if (operator === "subtraction") return subtract(num1, num2);
  if (operator === "multiplcation") return multiply(num1, num2);
  if (operator === "division") return divide(num1, num2);
}

function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

document.addEventListener("DOMContentLoaded", application);
