import { body } from "./DOMref.js";

function application() {
  const buttons = body.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", buttonSelection);
  });
}

let calculator = (function () {
  let num1 = "0";
  let operator = "";
  let num2 = "";
  let repeatedOperatorFlag = false;
  let prevOperator = "";
  let noEnteredSecondNumFlag = false;
  let equalPressed = false;
  return {
    num1,
    operator,
    num2,
    repeatedOperatorFlag,
    prevOperator,
    noEnteredSecondNumFlag,
  };
})();

// TODO initial "." needs to spawn a "0" in front
// TODO handle more than one "." entry
// TODO add keyboard support
function buttonSelection() {
  let part = this.className;
  if (part === "number") {
    numberChange(this.textContent);
  }
  if (isOperator(part)) {
    operatorButton(part);
  }
  if (part === "equal") {
    equalButton();
  }
  if (part === "clear") {
    clearButton();
  }
  if (part === "delete") {
    deleteButton();
  }
}

function numberChange(text) {
  const display = body.getElementsByClassName("displayLower");
  if (isOperator(calculator.operator)) {
    isEqualPressed();
    calculator.noEnteredSecondNumFlag = false;
    calculator.num2 += text;
    calculator.num2 = largeInput(calculator.num2);
    display[0].textContent = calculator.num2;
    calculator.repeatedOperatorFlag = true;
    calculator.prevOperator = calculator.operator;
  } else {
    initialDisplayCondition(text);
    calculator.num1 = largeInput(calculator.num1);
    display[0].textContent = calculator.num1;
    calculator.noEnteredSecondNumFlag = true;
  }
}

function isEqualPressed() {
  if (calculator.equalPressed) {
    calculator.num2 = "";
    calculator.equalPressed = false;
  }
}

function initialDisplayCondition(text) {
  if (calculator.num1 === "0") {
    calculator.num1 = text;
  } else {
    calculator.num1 += text;
  }
}

function largeInput(num) {
  if (num.length > 21) {
    return deleteTailOfString(num);
  }
  return num;
}

function operatorButton(part) {
  const displayUpper = body.getElementsByClassName("displayUpper");
  const displayLower = body.getElementsByClassName("displayLower");
  makeChangesForRepeatedOperators();
  calculator.operator = part;
  displayUpper[0].textContent = calculator.num1 + " " + operatorString(part);
  displayLower[0].textContent = calculator.num1;
}

function makeChangesForRepeatedOperators() {
  if (calculator.repeatedOperatorFlag) {
    let result = operate(
      calculator.num1,
      calculator.prevOperator,
      calculator.num2
    );
    checkZeroDivision();
    calculator.num1 = Math.round(result * 10000000000) / 10000000000;
    calculator.prevOperator = calculator.operator;
    calculator.num2 = "";
  }
}

function checkZeroDivision() {
  if (calculator.num2 === "0") {
    const displayUpper = body.getElementsByClassName("displayUpper");
    displayUpper[0].textContent =
      calculator.num1 + " " + operatorString(calculator.operator);
    calculator.num2 = calculator.num1;
  }
}

function operatorString(part) {
  if (part === "addition") return "+";
  if (part === "subtraction") return "-";
  if (part === "multiplcation") return "×";
  if (part === "division") return "÷";
}

function equalButton() {
  if (calculator.operator === "") {
    return;
  }
  if (calculator.noEnteredSecondNumFlag) {
    calculator.num2 = calculator.num1;
    calculator.noEnteredSecondNumFlag = false;
  }
  const displayUpper = body.getElementsByClassName("displayUpper");
  const displayLower = body.getElementsByClassName("displayLower");
  calculator.repeatedOperatorFlag = false;
  let result = operate(calculator.num1, calculator.operator, calculator.num2);
  result = Math.round(result * 10000000000) / 10000000000;
  displayUpper[0].textContent =
    calculator.num1 +
    " " +
    operatorString(calculator.operator) +
    " " +
    calculator.num2 +
    " =";
  displayLower[0].textContent = result;
  calculator.num1 = "" + result;
  calculator.equalPressed = true;
  checkZeroDivision();
}

function clearButton() {
  calculator.num1 = "0";
  calculator.operator = "";
  calculator.num2 = "";
  const displayUpper = body.getElementsByClassName("displayUpper");
  displayUpper[0].textContent = "";
  const displayLower = body.getElementsByClassName("displayLower");
  displayLower[0].textContent = "0";
}

function deleteButton() {
  const displayLower = body.getElementsByClassName("displayLower");
  if (calculator.noEnteredSecondNumFlag) {
    calculator.num1 = deleteTailOfString(calculator.num1);
    displayLower[0].textContent = calculator.num1;
  } else {
    calculator.num2 = deleteTailOfString(calculator.num2);
    displayLower[0].textContent = calculator.num2;
  }
}

function deleteTailOfString(number) {
  let str = number;
  return str.substr(0, str.length - 1);
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
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === "0") {
    alert("Can't divide by Zero you silly goose!");
    return num1;
  }
  return num1 / num2;
}

document.addEventListener("DOMContentLoaded", application);
