// Calculator works by building and manipulating an array 'inputs[0, 1, 2]'

let screen = document.querySelector('.screen');
let numBtn = document.querySelectorAll('.numBtn');
let opBtn = document.querySelectorAll('.opBtn');
let decimal = document.querySelector('#decimal');
let equals = document.querySelector('#eval');
let back = document.querySelector('#back');
let clear = document.querySelector('#clear');
let neg = document.querySelector('#neg');
let inputs = [];

screen.textContent = '0';
// Listeners for clear and back buttons
clear.addEventListener('click', () => {
    inputs.length = 0;
    screen.textContent = '0';
    equals.style.backgroundColor = 'rgb(223, 172, 219)' // sets color back to normal from eval() change
});
// This code deals with the back button
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
    if (inputs[0] == undefined) {            // keeps 0 on screen if '-' hit before inputs[0] populates
        inputs.pop();
        inputs.push('-0');
        screen.textContent = inputs.join(" ");
    } else if (inputs.length == 1) {             // checks inputs[0] for '-'
        let opOne = inputs[0];
        let negTest = opOne.toString();
        let negArray = Array.from(negTest)
        if (negArray.includes('-') == true) {   // if inputs[0] has '-', removes it
            negArray.shift();
            let noNeg = negArray.join('')
            inputs.pop();
            inputs.push(noNeg);
            screen.textContent = inputs.join(" ");
        } else {                                // if inputs[0] doesn't have '-', adds it
            let opOneAdd = inputs[0];
            let negAdd = opOneAdd.toString();
            let withNeg = '-' + negAdd;
            inputs.pop();
            inputs.push(withNeg);
            screen.textContent = inputs.join(" ");
        }
    } else if (inputs.length == 2 && inputs[2] == undefined) {  // keeps 0 on screen if '-' hit before inputs[2] populates
        inputs.push('-0');
        screen.textContent = inputs.join(" ");
    } else if (inputs.length == 3) {                  // checks inputs[2] for '-'
        let opTwo = inputs[2];
        let negTest2 = opTwo.toString();
        let negArray2 = Array.from(negTest2)
        if (negArray2.includes('-') == true) {      // if inputs[2] has '-', removes it
            negArray2.shift();
            let noNeg2 = negArray2.join('')
            inputs.pop();
            inputs.push(noNeg2);
            screen.textContent = inputs.join(" ");
        } else {                                    // if inputs[0] doesn't have '-', adds it
            let opTwoAdd = inputs[2];
            let negAdd2 = opTwoAdd.toString();
            let withNeg2 = '-' + negAdd2;
            inputs.pop();
            inputs.push(withNeg2);
            screen.textContent = inputs.join(" ");
        }
    }
})

// Listeners for '.' button
decimal.addEventListener('click', () => {
    if (screen.textContent == '0') {            // makes sure a 0 stays infront of '.' always
        inputs.pop()
        inputs.push('0');
        screen.textContent = inputs.join(' ')
    } else if (screen.textContent === '-') {     // makes sure a 0 stays infront of '.' always if negative
        inputs.length = 0
        inputs.push('-0');
        screen.textContent = inputs.join(' ')
    }
})

// Listeners for number buttons
numBtn.forEach((numBtn) => numBtn.addEventListener('click', () => {
    let screenCount = inputs.toString();
    let cleanCount = screenCount.replace('.', '');
    // This code deals with equation reseting equation if a number is clicked after solution is on screen
    if (equals.style.backgroundColor == 'rgb(223, 172, 218)' && inputs.length == 1) { // reads when eval()just ran and answer showing
        inputs.pop()                                // resets array if screen currently shows answer to previous proble,
        inputs.push(numBtn.value)                   // so it doesnt just add numers to the answer
        screen.textContent = inputs.join(" ");      // - numbers were just getting tacked on to the answer if you hit numBtn . . .
        equals.style.backgroundColor = 'rgb(223, 172, 219)' // exits color change loop
    } else if (cleanCount.length >= 13) {  // limits screen display
        return

        // This code deals with when and how to add a decimal '.'
    } else if (inputs.length >= 1 && inputs.length < 2 && numBtn.value == '.') { // cant add consecutive '.' [0]
        let grabber = inputs[0]
        let decTest = grabber.toString();
        let decArray = Array.from(decTest)
        if (decArray.includes('.') == true) {   // searches to see if '.'
            return;
        } else {                                // includes '.' in [0]
            inputs.push(numBtn.value);
            let decJoin = inputs.splice(0, 2);
            let addDec = decJoin.join('')
            inputs.push(addDec);
            screen.textContent = inputs.join(" ");
        }
    } else if (inputs.length === 2 && numBtn.value == '.') {     // add '0' infront of '.' in [2]
        inputs.push('0.');
        screen.textContent = inputs.join(" ");
    } else if (inputs.length > 2 && numBtn.value == '.') { // cant add consecutive '.' to [2]
        let grabber2 = inputs[2]
        let decTest2 = grabber2.toString();
        let decArray2 = Array.from(decTest2)
        if (decArray2.includes('.') == true) {          // looks for '.' in [2] so a second isn't added
            return;
        } else {                                          // include '.' in [2]
            inputs.push(numBtn.value);
            let decJoin3 = inputs.splice(2, 4);
            let addDec3 = decJoin3.join('')
            inputs.push(addDec3);
            screen.textContent = inputs.join(" ");
        }

        // This code deals with a number click when screen shows '0'
    } else if ((screen.textContent == '0' || inputs[0] == '0') && numBtn.value == '0') {      // cant add 0 before other #
        return
    } else if ((inputs[2] == '0' || inputs[2] == '-0') && numBtn.value == '0') {         // cant consecutive '0' in [2]
        return
    } else if (inputs[0] == '0') {      // removes '0' for next click
        inputs.pop()
        inputs.push(numBtn.value)
        screen.textContent = inputs.join(" ");
    } else if (inputs[0] == '-0') {    // removes '0' for next click if [2] is negative
        let removeNeg = inputs[0].toString();
        let pos = removeNeg.replace('0', numBtn.value);
        inputs.length = 0
        inputs.push(pos);
        screen.textContent = inputs.join(" ")
    } else if (inputs[2] == '0' && numBtn.value !== '.') {
        inputs.pop()
        inputs.push(numBtn.value)
        screen.textContent = inputs.join(" ");
    } else if (inputs[2] == '-0' && numBtn.value !== '.') {
        let removeNeg = inputs[2].toString();
        let pos = removeNeg.replace("0", numBtn.value);
        inputs.pop()
        inputs.push(pos);
        screen.textContent = inputs.join(" ")

        //This code deals with adding a number to inputs[0] and inputs[2] 
    } else if (inputs.length === 1) { // add #s to 1st operand by joining to array[0]
        inputs.push(numBtn.value);
        let joiner = inputs.splice(0, 2);
        let secondOperand = joiner.join('')
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    } else if (inputs.length === 3) { // add #s to 2nd operand by joining to array[2]
        inputs.push(numBtn.value);
        let joiner = inputs.splice(2, 4);
        let secondOperand = joiner.join('')
        inputs.push(secondOperand);
        screen.textContent = inputs.join(" ");
    } else {
        inputs.push(numBtn.value)
        screen.textContent = inputs.join(" ");
    }
}));


// Listeners for operator buttons
opBtn.forEach((opBtn) => opBtn.addEventListener('click', () => {
    let screenCount = inputs.toString()
    if (screenCount.length >= 14) {

        return
    } else if (inputs.length === 3) {
        if (inputs[2] == '-') {
            return
        } else {
            evaluate()
        }
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
    if (inputs.length !== 3 || (inputs.length == 3 && inputs[2] == '-')) {
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
        case 'x':
            return multiply(a, b)
        case '÷':
            return divide(a, b)
    }
}

function evaluate() {
    let result = operate(inputs[1], Number(inputs[0]), Number(inputs[2]))
    let roundResult = Math.round(1000000 * result) / 1000000;
    screen.textContent = roundResult;
    inputs.length = 0;
    inputs[0] = roundResult;
    equals.style.backgroundColor = 'rgb(223, 172, 218)'; // this is how to tell if screen is currently
}                                                       //an answer. this interacts with first conditional on numBtn


// The begginings of keyboard UI // 

// document.addEventListener('keydown', function(e) {
//     if (e.key >= 0 && e.key <= 9)  {
//         inputs.push(e.key)
//         screen.textContent = inputs.join(" ");
//     }
//   });

