import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonCreateEl = document.querySelector('button[type="submit"]');
const inputFirstDelayEl = document.querySelector('input[name="delay"]');
const inputDelayStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');



buttonCreateEl.addEventListener('click', onButtonClick);

function onButtonClick() {
  for (let i = 1; i <= inputAmountEl.value; i += 1){
    createPromise(i, inputFirstDelayEl.value)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
    
  };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
    
  });
  
};

