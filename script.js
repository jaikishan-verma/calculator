const calculationDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumerValue(number) {
  if (awaitingNextValue) {
    calculationDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculationDisplay.textContent;
    calculationDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  if (!calculationDisplay.textContent.includes(".")) {
    calculationDisplay.textContent = `${calculationDisplay.textContent}.`;
  }
}

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculationDisplay.textContent = "0";
}

function handleOperator(operator) {
  const currentValue = Number(calculationDisplay.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculationDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumerValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => handleOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

clearBtn.addEventListener("click", resetAll);
