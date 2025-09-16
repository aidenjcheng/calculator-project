import "./style.css";

let firstInt = undefined;
let secondInt = undefined;
let operator = undefined;
let currentInt = 1;

let calculatorScreenValue = "-";
function setFirstInt(value) {
 firstInt = value;
}
function setSecondInt(value) {
 secondInt = value;
}
function setOperator(value) {
 operator = value;
}
function setCurrentInt(value) {
 currentInt = value;
}

const handleNumberClick = (number) => {
 console.log("onNumberClick called");
 let newValue = undefined;

 let isFirstInt = currentInt == 1;

 if ((firstInt && isFirstInt) || (secondInt && !isFirstInt)) {
  console.log("adding number");

  if (currentInt == 1) {
   console.log("first");
   newValue = firstInt + number;
  } else {
   console.log("second");

   newValue = calculatorScreenValue + secondInt + number;
  }
 } else {
  if (isFirstInt) {
   console.log("not adding number");
   newValue = number;
   calculatorScreenValue = newValue;
  } else {
   newValue = number;
   calculatorScreenValue += number;
  }
 }
 console.log("the new value is " + newValue);
 updateCalculator();
 if (currentInt == 1) {
  setFirstInt(parseInt(newValue));
 } else {
  setSecondInt(parseInt(newValue));
 }
};

const updateCalculator = () => {
 let calulatorScreen = document.getElementById("calc_screen");
 calulatorScreen.innerHTML = calculatorScreenValue;
};

const handleOperatorClick = (operator) => {
 if (firstInt) {
  setCurrentInt(2);
  console.log("handle operator click");
  setOperator(operator);
  calculatorScreenValue += Operator(operator);
  updateCalculator();
 }
};

const handleEqualClick = () => {
 if (firstInt && secondInt && operator) {
  setCurrentInt(1);
  console.log("handle equal click");
  calculatorScreenValue = ApplyOperation();
  setOperator(undefined);
  setFirstInt(undefined);
  setSecondInt(undefined);
  updateCalculator();
 }
};

const Operator = (value) => {
 switch (value) {
  case "plus":
   return "+";
  case "minus":
   return "-";
  case "divide":
   return "/";
  case "multiply":
   return "*";
 }
};

const ApplyOperation = () => {
 switch (operator) {
  case "plus":
   return firstInt + secondInt;
  case "minus":
   return firstInt - secondInt;
  case "divide":
   return firstInt / secondInt;
  case "multiply":
   return firstInt * secondInt;
 }
};

const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operatorButtons = ["plus", "minus", "divide" + "multiply"];
const buttons = [...numberButtons, ...operatorButtons];
buttons.forEach((id) => {
 const el = document.getElementById(id);
 if (el && !operatorButtons.includes(id)) {
  el.addEventListener("click", () => handleNumberClick(id));
 } else if (el && id) {
  el.addEventListener("click", () => handleOperatorClick(id));
 }
});

document
 .getElementById("equal")
 .addEventListener("click", () => handleEqualClick());
