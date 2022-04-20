let screen = document.querySelector('.screen');
let numBtn = document.querySelectorAll('.numBtn');
let opBtn = document.querySelectorAll('.opBtn');
let decimal = document.querySelector('#decimal');
let equals = document.querySelector('#eval');
let back = document.querySelector('#back');
let clear = document.querySelector('#clear');
let inputs = [];

screen.textContent = "0"

// Listeners for clear and back buttons

clear.addEventListener('click', () => {
    inputs.length = 0;
    screen.textContent = "0";
});
back.addEventListener('click', () => {
    inputs.pop();
    screen.textContent = inputs.join(" ")
});
decimal.addEventListener('click', () => {
    inputs.push(decimal.value)
    screen.textContent = inputs.join(" ");
});


// Listeners for number and operator buttons
numBtn.forEach((numBtn) => numBtn.addEventListener('click', () => {
    inputs.push(numBtn.value)
    screen.textContent = inputs.join(" ");
}));
opBtn.forEach((opBtn) => opBtn.addEventListener('click', () => {
    if(inputs.length === 3){
        evaluate()
    }
    inputs.push(opBtn.value)
    screen.textContent = inputs.join(" ");
}));

// Runs math on = click
equals.addEventListener('click', () => {
    if(inputs.length !== 3){
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
    let roundResult = Math.round(10000000*result)/10000000; 
    screen.textContent = roundResult;
    inputs.length = 0;
    inputs[0] = roundResult; 
}


// function evaluate() {
//     operate(inputs[1], Number(inputs[0]), Number(inputs[2]))
// }