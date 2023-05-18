import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let delay = Number(refs.inputDelay.value);
  let step = Number(refs.inputStep.value);
  let amount = Number(refs.inputAmount.value);
  let position = 0;
  delay = delay - step;
  refs.form.reset();
  for (let i = 0; i < amount; i += 1) {
    position = i + 1;
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
