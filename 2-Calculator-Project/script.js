// ===== 1. GRAB ELEMENTS =====
let display = document.getElementById("display");
let btn0 = document.getElementById("btn0");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let btn7 = document.getElementById("btn7");
let btn8 = document.getElementById("btn8");
let btn9 = document.getElementById("btn9");
let btnAdd = document.getElementById("btnAdd");
let btnMinus = document.getElementById("btnMinus");
let btnMultiply = document.getElementById("btnMultiply");
let btnDivide = document.getElementById("btnDivide");
let btnEqual = document.getElementById("btnEqual");
let btnClear = document.getElementById("btnClear");

let currentValue = "0";
let previousValue = null;
let operator = null;
let equal = false;

function numbersHolder(number) {
    if (equal === true) {
        currentValue = "0";
        equal = false;
    }
     if (currentValue === "0") {
        currentValue = number;
    } else {
        currentValue = currentValue + number;
    }
    display.textContent = currentValue;
}
function operatorsHolder(opr) {
    if (operator !== null) {
        colculation()
    }
        previousValue = currentValue;
        operator = opr;
        currentValue = "0";
}

function colculation() {
    
        let current = Number(currentValue);
        let previous = Number(previousValue);
        let result;

       if (operator === "p") {
        result = previous + current;
        let finalResult = String(result);
        currentValue = finalResult
    display.textContent = currentValue;
        previousValue = "0";
        operator = null; 
       }
    else if (operator === "m") {
        result = previous - current;
        let finalResult = String(result);
        currentValue = finalResult
    display.textContent = currentValue;
        previousValue = "0";
        operator = null; 
    }
    else if (operator === "mu") {
      result = previous * current;
    let finalResult = String(result);
        currentValue = finalResult
    display.textContent = currentValue;
        previousValue = "0";
        operator = null; 
    }
    else if (operator === "d") {
      if (current === 0) {
        display.textContent = "Error";
        return;
        } else {
        result = previous / current;
        let finalResult = String(result);
        currentValue = finalResult
    display.textContent = currentValue;
        previousValue = "0";
        operator = null; 
        }
    }
    
}
function btnC() {
        currentValue = "0";
      previousValue = null;
      operator = null;
      display.textContent = currentValue;
      equal = false;
}
 
function btnE() {
    if (operator === "d") {
    if (currentValue === "0") {
        display.textContent = "Error";
        return;
    }
}
    colculation()
      display.textContent = currentValue;
      equal = true;
}
btn0.addEventListener("click", () => {
    numbersHolder("0")
});
btn1.addEventListener("click", () => {
    numbersHolder("1")
});
btn2.addEventListener("click", () => {
    numbersHolder("2")
});
btn3.addEventListener("click", () => {
    numbersHolder("3")
});
btn4.addEventListener("click", () => {
    numbersHolder("4")
});
btn5.addEventListener("click", () => {
    numbersHolder("5")
});
btn6.addEventListener("click", () => {
    numbersHolder("6")
});
btn7.addEventListener("click", () => {
    numbersHolder("7")
});
btn8.addEventListener("click", () => {
    numbersHolder("8")
});
btn9.addEventListener("click", () => {
    numbersHolder("9")
});
btnAdd.addEventListener("click", () => {
    operatorsHolder("p")
});
btnMinus.addEventListener("click", () => {
    operatorsHolder("m")
});
btnMultiply.addEventListener("click", () => {
    operatorsHolder("mu")
});
btnDivide.addEventListener("click", () => {
    operatorsHolder("d")
});
btnEqual.addEventListener("click", () => {
    btnE()
});
btnClear.addEventListener("click", () => {
    btnC()
});