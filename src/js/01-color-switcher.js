const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');

let timerId = null;
buttonStopEl.disabled = true;

buttonStartEl.addEventListener('click', onButtonStartClick);
buttonStopEl.addEventListener('click', onButtonStopClick);

function onButtonStartClick() {
    timerId = setInterval(() => {
        document.body.setAttribute('style', `background-color:${getRandomHexColor()}`)
    }, 1000);
    buttonStartEl.disabled = true;
    buttonStopEl.disabled = false;
}

function onButtonStopClick() {
    clearInterval(timerId);
    buttonStartEl.disabled = false;
    buttonStopEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

