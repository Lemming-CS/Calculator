let acts = document.querySelectorAll(".act");
let numbers = document.querySelectorAll(".number");
let screen = document.querySelector(".screen");
let clear = document.querySelector("#clear");
let del = document.querySelector("#delete")
let number = document.createElement("span")
let temp, secondNum = '';
let currentNum = '';
let isActing = false;
let lastOperator = '';
let isFloating = false;

screen.appendChild(number)

numbers.forEach( button => {
    button.addEventListener("click", function(event) {
        if (event.target.id === '.') {
            if (isFloating) {
                return;
            }
            temp = event.target.id;
            isFloating = true;   
        }
        else {
            temp = Number(event.target.id);
        }
        if (isActing) {
            secondNum = secondNum + String(temp);
        }
        else {
           currentNum = currentNum + String(temp);
        }
        updateScreen();
    });
});

acts.forEach( act => {
    act.addEventListener('click', function(event) {
        operate()
        switch(event.target.id) {
            case '+':
                lastOperator = '+';
                isActing = true;
                isFloating = false;
                updateScreen();
                break;
            case '-':
                lastOperator = '-';
                isActing = true;
                isFloating = false;
                updateScreen();
                break;
            case '*':
                lastOperator = '*';
                isActing = true;
                isFloating = false;
                updateScreen();
                break;
            case '/':
                lastOperator = '/';
                isActing = true;
                isFloating = false;
                updateScreen();
                break;
            case '=':
                isActing = false;
                lastOperator = '';
                isFloating = false;
                updateScreen();
                currentNum = '';
                break;
        }
    })
})
clear.addEventListener('click', function() {
    currentNum = '', secondNum = '', isActing = false, isFloating = false;
    updateScreen();
})

del.addEventListener('click', function() {
    if (isActing) {
        secondNum = secondNum.split('').slice(0, -1).join('');
    }
    else {
        currentNum = currentNum.split('').slice(0, -1).join('');
    }
    updateScreen()
})
function updateScreen() {
    if (isActing) {
        number.textContent = `${Number(currentNum)} ${lastOperator} ${isFloating ? secondNum : Number(secondNum)}`;
    }
    else {
        number.textContent = `${currentNum}`;
    }
}

function operate() {
    if (isActing) {
        switch(lastOperator) {
            case '+':
                currentNum = String(numShorter(Number(currentNum) + Number(secondNum)));
                secondNum = '';
                break;
            case '-':
                currentNum = String(numShorter(Number(currentNum) - Number(secondNum)));
                secondNum = '';
                break;
            case '*':
                currentNum = String(numShorter(Number(currentNum) * Number(secondNum)));
                secondNum = '';
                break;
            case '/':
                currentNum = String(numShorter(Number(currentNum) / Number(secondNum)));
                secondNum = '';
                break;
        }
    }
}

function numShorter(num) {
    return Math.floor(num * 10 ** 10) / 10 ** 10
}
