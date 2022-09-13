'use strict'

import Notiflix from 'notiflix';

const form = document.querySelector('.form');

let delay = '';
let step = '';
let amount = '';


form.addEventListener('input', onFormInput);

function onFormInput(event) {
  if(event.target.name === 'delay'){
    delay = Number(event.target.value);
  };
  if(event.target.name === 'step'){
    step = Number(event.target.value);
  };
  if(event.target.name === 'amount'){
    amount = Number(event.target.value);
  };
};

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    delay -= step;
    for(let i = 1; i <= amount; i +=1){
      createPromise(i, delay += step)
      .then(({ position, delay }) => {
        setTimeout(() => {Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);}, delay)
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);}, delay)
      });
    }
};


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }}, delay)
  });
};
