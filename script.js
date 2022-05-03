// Calculator works by building and manipulating an array  'inputs[a, b, c]'

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
    if (inputs[0] == '-' || inputs[2] == '-') {         // stops user form entering multiple '-'
        return
    } else if(inputs[0] === ('-0')) {                   //removes '-' if 1st op is -0
        let removeNeg = inputs[0].toString();
        let pos = removeNeg.replace("-", "");
        inputs.length = 0
        inputs.push(pos);
        screen.textContent = inputs.join(" ")
        return
    } else if (inputs[0] == undefined || inputs[0] === '0') {  // keeps 0 on screen if '-' hit before inputs[] populates
        inputs.pop();
        inputs.push('-0');
        screen.textContent = inputs.join('')
    } else if (inputs[0] < 0 && inputs.length == 1) {        // adds '-' to 1st #
        let removeNeg = inputs[0].toString();
        let pos = removeNeg.replace("-", "");
        inputs.length = 0
        inputs.push(pos);
        screen.textContent = inputs.join(" ")
    } else if (inputs[0] > 0 && inputs.length == 1) {       // removes '-' form 1st number if already has 
        let addNeg = inputs[0].toString();
        let negSign = '-' + addNeg;
        inputs.length = 0
        inputs.push(negSign);
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] === '0.') {                // removes '-' if 2nd op is 0.
        inputs.pop()
        inputs[2] = '-0.'
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] === '-0.') {               // removes '-' if 2nd op is -0.
        inputs.pop()
        inputs[2] = '0.'
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] == '0') {                   // removes '-' if 2nd op is 0
        inputs.pop()
        inputs[2] = '-0'
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] === '-0') {                // removes '-' if 2nd op is -0
        inputs.pop()
        inputs[2] = '0'
        screen.textContent = inputs.join(" ")
    }else if (inputs[2] < 0) {                    // removes '-' from 2nd op if already negative
        let removeNeg2 = inputs[2].toString();
        let pos2 = removeNeg2.replace("-", "");
        inputs.pop();
        inputs.push(pos2);
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] > 0) {                    // adds '-' to 2nd op if > 0
        let addNeg2 = inputs[2].toString();
        let negSign2 = '-' + addNeg2;
        inputs.pop();
        inputs.push(negSign2);
        screen.textContent = inputs.join(" ")
    } else {                                       // adds '-'
        inputs.push(neg.value)
        screen.textContent = inputs.join(" ");
    }
})

// Listeners for '.' button
decimal.addEventListener('click', () => {
    if (screen.textContent == '0') {            // makes sure a 0 stays infront of '.' always
        inputs.pop()
        inputs.push('0');
        screen.textContent = inputs.join('')
    } else if (screen.textContent == '-') {     // makes sure a 0 stays infront of '.' always if negative
        inputs.length = 0
        inputs.push('-0');
        screen.textContent = inputs.join('')
    }
})

// Listeners for number buttons
numBtn.forEach((numBtn) => numBtn.addEventListener('click', () => {
    if (inputs.length >= 1 && inputs.length < 2 && numBtn.value == '.') { // cant add consecutive '.' to 1st operand
        let grabber = inputs[0]
        let decTest = grabber.toString();
        let decArray = Array.from(decTest)
        if (decArray.includes('.') == true) {   // searches to see if '.'
            return;
        } else {                                // includes '.' in array[0]
            inputs.push(numBtn.value);
            let decJoin = inputs.splice(0, 2);
            let addDec = decJoin.join("")
            inputs.push(addDec);
            screen.textContent = inputs.join(" ");
        }
    } else if (inputs.length == 2 && numBtn.value == '.') {     // add '0' infront of '.' in 2nd op
        inputs.push('0.');
        screen.textContent = inputs.join(" ");
    } else if (inputs.length > 2 && numBtn.value == '.') { // cant add consecutive '.' to 2nd operand
        let grabber2 = inputs[2]
        let decTest2 = grabber2.toString();
        let decArray2 = Array.from(decTest2)
        if (decArray2.includes('.') == true) {          // looks for '.' in 2nd op so a second isn't added
            return;
        }else if (decArray2.includes('-') == true) {    // adds '0' infront of '.' on 2nd op, if neg
            inputs.push('0.');
            let decJoin2 = inputs.splice(2, 4);
            let addDec2 = decJoin2.join("")
            inputs.push(addDec2);
            screen.textContent = inputs.join(" ");
        }else {                                          // include '.' in array[2]
            inputs.push(numBtn.value);
            let decJoin3 = inputs.splice(2, 4);
            let addDec3 = decJoin3.join("")
            inputs.push(addDec3);
            screen.textContent = inputs.join(" ");
        }
    } else if ((screen.textContent == '0' || inputs[0] =='0') && numBtn.value == '0') {      // cant add 0 before other #
        return
    } else if ((inputs.length == 2  || inputs[2] == '0' || inputs[2] == '-0')&& numBtn.value == '0') {         // cant add 0 before other # in 2nd operand
        return
    }else if (inputs[0] == '0') {
        inputs.pop()
        inputs.push(numBtn.value)
        screen.textContent = inputs.join(" ");
    }else if (inputs[0] == '-0') {
        let removeNeg = inputs[0].toString();
        let pos = removeNeg.replace("0", numBtn.value);
        inputs.length = 0
        inputs.push(pos);
        screen.textContent = inputs.join(" ")
    } else if (inputs.length === 1) { // add #s to 1st operand by joining to array[0]
        inputs.push(numBtn.value);
        let joiner = inputs.splice(0, 2);
        let secondOperand = joiner.join("")
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    } else if (inputs.length === 3) { // add #s to 2nd operand by joining to array[2]
        inputs.push(numBtn.value);
        let joiner = inputs.splice(2, 4);
        let secondOperand = joiner.join("")
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    }else {
        inputs.push(numBtn.value)
        screen.textContent = inputs.join(" ");
    }
}));

// Listeners for operator buttons
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

// Runs math on '=' click
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

