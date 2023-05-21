import { body } from "./DOMref.js";

function application() {
  //   let display = document.getElementsByClassName("display")[0].text;
  //   console.log(display);
  const buttons = body.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", buttonSelection);
  });
  operate(calculator.num1, calculator.operator, calculator.num2);
  //   console.log(operate(calculator.num1, calculator.operator, calculator.num2));
}

let calculator = (function () {
  let num1 = 6;
  let operator = "+";
  let num2 = 3;
  return { num1, operator, num2 };
})();

function buttonSelection() {
  let partNum1 = this.textContent;
  console.log(partNum1);
}

function operate(num1, operator, num2) {
  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "*") return multiply(num1, num2);
  if (operator === "/") return divide(num1, num2);
}

function add(num1, num2) {
  return num1 + num2;
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
