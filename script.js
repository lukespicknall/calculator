let screen = document.querySelector('.screen');
let numBtn = document.querySelectorAll('.numBtn');
let opBtn = document.querySelectorAll('.opBtn');
let decimal = document.querySelector('#decimal');
let equals = document.querySelector('#eval');
let back = document.querySelector('#back');
let clear = document.querySelector('#clear');
let neg = document.querySelector('#neg');
let inputs = [];

screen.textContent = "0";
let answered = undefined;
// Listeners for clear and back buttons
clear.addEventListener('click', () => {
    inputs.length = 0;
    screen.textContent = '0';
});
back.addEventListener('click', () => {
    let backBreak = inputs.toString();
    if (inputs.length === 1 && backBreak.length > 1) {
        let removed = backBreak.substring(0, backBreak.length - 1)
        inputs.length = 0
        inputs.push(removed);
        screen.textContent = inputs.join(" ")
    } else if (inputs.length === 3 && inputs[2].toString().length === 1) {
        inputs.pop();
        screen.textContent = inputs.join(" ")
    } else if (inputs.length > 2) {
        let backBreak2 = inputs[2].toString();
        let removed2 = backBreak2.substring(0, backBreak2.length - 1)
        inputs.pop();
        inputs.push(removed2);
        screen.textContent = inputs.join(" ")
    } else if (inputs.length < 2) {
        inputs.pop();
        screen.textContent = '0';
    } else {
        inputs.pop();
        screen.textContent = inputs.join(" ")
    }
});

// add and removes negative symbol // 
neg.addEventListener('click', () => {
    if (inputs[0] == '-' || inputs[2] == '-') { // stops user form entering multiple '-'
        return
    } else if (inputs[0] < 0 && inputs.length == 1) { // adds '-' to 1st #
        let removeNeg = inputs[0].toString();
        let pos = removeNeg.replace("-", "");
        inputs.length = 0
        inputs.push(pos);
        screen.textContent = inputs.join(" ")
    } else if (inputs[0] > 0 && inputs.length == 1) { // removes '-' form 1st number if already has 
        let addNeg = inputs[0].toString();
        let negSign = '-' + addNeg;
        inputs.length = 0
        inputs.push(negSign);
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] < 0) {                    // adds '-' to 2nd #
        let removeNeg2 = inputs[2].toString();
        let pos2 = removeNeg2.replace("-", "");
        inputs.pop();
        inputs.push(pos2);
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] > 0) {                    // removes '-' from 2nd number if already has
        let addNeg2 = inputs[2].toString();
        let negSign2 = '-' + addNeg2;
        inputs.pop();
        inputs.push(negSign2);
        screen.textContent = inputs.join(" ")
    } else {
        inputs.push(neg.value)
        screen.textContent = inputs.join(" ");
    }
})

decimal.addEventListener('click', () => {
    if (screen.textContent == '0') {
        inputs.push('0');
        screen.textContent = inputs.join('')
    }
})

// Listeners for number and operator buttons
numBtn.forEach((numBtn) => numBtn.addEventListener('click', () => {
    if ((inputs[0] % 1 !== 0 && inputs[2] % 1 !== 0) && numBtn.value == '.') { // cant add '.' if already has
        return   
    } else if (screen.textContent == '0' && numBtn.value == '0') { // cant add 0 before other #
        return
    }else if (inputs.length == 2 && numBtn.value == '0') { // cant add 0 before other # in 2nd operand
        return
    }else if (inputs.length === 1) {
        inputs.push(numBtn.value);
        let joiner = inputs.splice(0, 2);
        let secondOperand = joiner.join("")
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    } else if (inputs.length === 3) {
        inputs.push(numBtn.value);
        let joiner = inputs.splice(2, 4);
        let secondOperand = joiner.join("")
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    } else {
        inputs.push(numBtn.value)
        screen.textContent = inputs.join(" ");
    }
}));
opBtn.forEach((opBtn) => opBtn.addEventListener('click', () => {
    if (inputs.length === 3) {
        evaluate()
    } else if (inputs.length === 0 && screen.textContent == "0") {
        return;
    } else if (inputs.length === 2) {
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
    let answered = true;
}

// defVal();
// function defVal() {
//     if (inputs.length === 0) {
//         screen.textContent = '0';
//     }
// }

