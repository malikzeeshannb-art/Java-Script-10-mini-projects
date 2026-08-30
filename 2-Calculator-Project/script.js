
let display = document.getElementById("input-section");

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5= document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let btn7 = document.getElementById("btn7");
let btn8 = document.getElementById("btn8");
let btn9 = document.getElementById("btn9");
let btn0= document.getElementById("btn0");
let btnC = document.getElementById("btn-c");
let btnP = document.getElementById("btn-p");
let btnM = document.getElementById("btn-m");
let btnMu = document.getElementById("btn-mu");
let btnD = document.getElementById("btn-d");
let btnE = document.getElementById("btn-e");

// source of truth:

let currentValue = "0";
let previousValue = null;
let operatorHolder = null;
let equal = false;

function numberHolder(num) {
    if (equal === true) {
        currentValue = "0";
        equal = false;
    }
    if (currentValue === "0") {
       currentValue = num;
    } else {
        currentValue = currentValue + num;
    }
     display.textContent = currentValue;
}

function operator(opr) {
    if (operatorHolder !== null) {
        calculation()
    } 
        operatorHolder = opr;
        previousValue = currentValue;
        currentValue = "0";
}

function calculation() {
    let P = Number(previousValue);
    let C = Number(currentValue);
   
     if (operatorHolder === "p") {
        currentValue = P + C;
     }
     else if (operatorHolder === "m") {
        currentValue = P - C;
     }
     else if (operatorHolder === "d") {
         if (currentValue === "0") {
            display.textContent = "Error";
            return;
         } else {
        currentValue = P / C;
       }
     }
     else if (operatorHolder === "mu") {
        currentValue = P * C;
     }
     display.textContent = currentValue;
     
    currentValue = String(currentValue);
    previousValue = "0";
    operatorHolder = null;
    }
 function clear() {
    currentValue = "0";
    previousValue = null;
    operatorHolder = null;
    equal = null;
    display.textContent = currentValue;
    } 

 function btnEqual() {
    if (operatorHolder === "d") {
        if (currentValue === "0") { 
            display.textContent = "Error";
            return;
        }
    }
    calculation()
    display.textContent = currentValue;
    equal = true;
 }

btnP.addEventListener("click", () => {
    operator("p")
});
btnD.addEventListener("click", () => {
    operator("d")
});
btnM.addEventListener("click", () => {
    operator("m")
});
btnMu.addEventListener("click", () => {
    operator("mu")
});
btnC.addEventListener("click", () => {
   clear()
});
btnE.addEventListener("click", () => {
    btnEqual()
});
btn0.addEventListener("click", () => {
    numberHolder("0")
});
btn1.addEventListener("click", () => {
    numberHolder("1")
});
btn2.addEventListener("click", () => {
    numberHolder("2")
});
btn3.addEventListener("click", () => {
    numberHolder("3")
});
btn4.addEventListener("click", () => {
    numberHolder("4")
});
btn5.addEventListener("click", () => {
    numberHolder("5")
});
btn6.addEventListener("click", () => {
    numberHolder("6")
});
btn7.addEventListener("click", () => {
    numberHolder("7")
});
btn8.addEventListener("click", () => {
    numberHolder("8")
});
btn9.addEventListener("click", () => {
    numberHolder("9")
});
