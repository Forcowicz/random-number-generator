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
    const elementError = document.getElementById(`${el.id}Error`);
    elementError.classList.remove('hidden');
    btn.setAttribute('disabled', true);
    switch (errorCode) {
        case 0:
            elementError.textContent = 'This field cannot be empty!';
            break;
        case 1:
            elementError.textContent = `The value must be above ${inputRangeFrom.value}`;
            break;
        case 2:
            elementError.textContent = 'The values must be different!';
            break;
        case 3:
            elementError.textContent = 'The value cannot be 0 or below!';
            break;
        case 4:
            elementError.textContent = 'The value cannot be above 500!';
            break;
    }
    el.classList.add('input--invalid');
    setTimeout(() => {
        btn.removeAttribute('disabled');
        elementError.classList.add('hidden');
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
    if(inputRangeFrom.value === '') {
        inputError(inputRangeFrom, 0);
    } else if(inputRangeTo.value === '') {
        inputError(inputRangeTo, 0);
    } else if(inputRangeFromValue > inputRangeToValue) {
        inputError(inputRangeTo, 1)
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
