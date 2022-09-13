'use strict'

const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let colorTimerId = null;


refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    colorTimerId = setInterval(() => 
    {refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    refs.startBtn.setAttribute("disabled", "");
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() {
    clearInterval(colorTimerId);
    refs.startBtn.removeAttribute("disabled");
};