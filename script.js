'use strict';

const generateNumber = function (min, max, amount) {
    const randomNumbers = [];
    amount = amount !== '' ? Number(amount) : 1;
    if(typeof min === 'number' && typeof max === 'number') {
        for(let i = 1; i <= amount; i++) {
            randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return randomNumbers;
    } else {
        return 'Invalid input!';
    }
}

const inputError = function (el, errorCode) {
    const elementLabel = document.getElementById(`${el.id}Label`);
    btn.setAttribute('disabled', true);
    switch (errorCode) {
        case 0:
            elementLabel.textContent = 'This field cannot be empty!';
            break;
        case 1:
            elementLabel.textContent = 'The minimal value cannot be higher than the maximum value!';
            break;
        case 2:
            elementLabel.textContent = 'The values must be different!';
            break;
        case 3:
            elementLabel.textContent = 'The value cannot be 0 or below!';
            break;
        case 4:
            elementLabel.textContent = 'Due to performance issues, the value cannot be above 500!';
            break;
    }
    el.classList.add('input--invalid');
    setTimeout(() => {
        btn.removeAttribute('disabled');
        elementLabel.textContent = 'Enter a number!';
        el.classList.remove('input--invalid');
    }, 3000);
}

let inputRangeFrom, inputRangeTo, inputAmount;

const btn = document.querySelector('.input__button');

btn.addEventListener('click', () => {
    inputRangeFrom = document.getElementById('inputRangeFrom');
    inputRangeTo = document.getElementById('inputRangeTo');
    const inputRangeFromValue = Number(inputRangeFrom.value);
    const inputRangeToValue = Number(inputRangeTo.value);
    inputAmount = document.getElementById('inputAmount');
    const sectionNumbers = document.querySelector('.numbers');
    if(!inputRangeFromValue) {
        inputError(inputRangeFrom, 0);
    } else if(!inputRangeToValue) {
        inputError(inputRangeTo, 0);
    } else if(inputRangeFromValue > inputRangeToValue) {
        inputError(inputRangeFrom, 1)
    } else if(inputRangeFromValue === inputRangeToValue) {
        inputError(inputRangeFrom, 2);
    } else if(inputAmount.value <= 0 && inputAmount.value !== '') {
        inputError(inputAmount, 3);
    } else if(inputAmount.value > 500) {
        inputError(inputAmount, 4);
    } else {
        const numbers = generateNumber(inputRangeFromValue, inputRangeToValue, inputAmount.value);
        sectionNumbers.style.opacity = '0';
        let str = "";
        setTimeout(() => {
            for(let i = 0; i < numbers.length; i++) {
                str += `<span class='numbers__element'>${numbers[i]}</span>`;
            }
            sectionNumbers.innerHTML = str;
        }, 150);
        for(let opacity = 0; opacity <= 1; opacity += 0.1) {
            setTimeout(() => {sectionNumbers.style.opacity = String(opacity)}, 150);
        }
    }
});