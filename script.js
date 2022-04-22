let screen = document.querySelector('.screen');
let numBtn = document.querySelectorAll('.numBtn');
let opBtn = document.querySelectorAll('.opBtn');
let decimal = document.querySelector('#decimal');
let equals = document.querySelector('#eval');
let back = document.querySelector('#back');
let clear = document.querySelector('#clear');
let inputs = [];

screen.textContent = "0"
defVal();

// Listeners for clear and back buttons

clear.addEventListener('click', () => {
    inputs.length = 0;
    screen.textContent = '0';
});
back.addEventListener('click', () => {
    let backBreak = inputs.toString();
    if(inputs.length === 1 && backBreak.length > 1) {
        let removed = backBreak.substring(0, backBreak.length - 1)
        inputs.length = 0
        inputs.push(removed);
        screen.textContent = inputs.join(" ")
    }else if (inputs.length === 3 && inputs[2].toString().length === 1) {
        inputs.pop();
        screen.textContent = inputs.join(" ")
    } else if (inputs.length > 2){
        let backBreak2 = inputs[2].toString();
        let removed2 = backBreak2.substring(0, backBreak2.length - 1)
        inputs.pop();
        inputs.push(removed2);
        screen.textContent = inputs.join(" ")
    }else if (inputs.length < 2) {
        inputs.pop();
        screen.textContent = '0';
    } else {
        inputs.pop();
        screen.textContent = inputs.join(" ")
    }
});

// Listeners for number and operator buttons
numBtn.forEach((numBtn) => numBtn.addEventListener('click', () => {
    if(inputs.length === 1) {
        inputs.push(numBtn.value);
        let joiner = inputs.splice(0, 2);
        let secondOperand = joiner.join("")
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    }else if(inputs.length === 3){
        inputs.push(numBtn.value);
        let joiner = inputs.splice(2, 4);
        let secondOperand = joiner.join("")
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    }
    else {
    inputs.push(numBtn.value)
    screen.textContent = inputs.join(" ");
    }
}));
opBtn.forEach((opBtn) => opBtn.addEventListener('click', () => {
    if (inputs.length === 3) {
        evaluate()
    } else if (inputs.length === 0 && screen.textContent == "0") {
        return;
    } else if (inputs.length === 2){
        return
    }
    inputs.push(opBtn.value)
    screen.textContent = inputs.join(" ");
}));

// Runs math on = click
equals.addEventListener('click', () => {
    if (inputs.length !== 3) {
        return
    }
    evaluate()
});


// Math Functions
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return sub(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
    }
}
function evaluate() {
    let result = operate(inputs[1], Number(inputs[0]), Number(inputs[2]))
    let roundResult = Math.round(1000000 * result) / 1000000;
    screen.textContent = roundResult;
    inputs.length = 0;
    inputs[0] = roundResult;
}

function defVal() {
    if (inputs.length === 0) {
        screen.textContent = '0';
    }
}
// function evaluate() {
//     operate(inputs[1], Number(inputs[0]), Number(inputs[2]))
// }
