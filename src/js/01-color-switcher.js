const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let idInterval = null;

refs.btnStart.addEventListener('click', onStartColorChange);
refs.btnStop.addEventListener('click', onStopColorChange);
refs.btnStop.setAttribute('disabled', 'disabled');

function onStartColorChange(evt) {
  idInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStop.removeAttribute('disabled');
  refs.btnStart.setAttribute('disabled', 'disabled');
}

function onStopColorChange(evt) {
    clearInterval(idInterval);
    refs.btnStart.removeAttribute('disabled');
    refs.btnStop.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
