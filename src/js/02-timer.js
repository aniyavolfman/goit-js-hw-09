import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonEl = document.querySelector('button[data-start]');

const dataDaysEl = document.querySelector('span[data-days]');
const dataHoursEl = document.querySelector('span[data-hours]');
const dataMinutesEl = document.querySelector('span[data-minutes]');
const dataSecondsEl = document.querySelector('span[data-seconds]');

const inputEl = document.querySelector('#datetime-picker');

let timerId = null;
let selected = null;

buttonEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            Notify.failure('Please choose a date in the future!'); 
            buttonEl.disabled = true;
        }
        else {
            console.log(selectedDates[0]);
            selected = selectedDates[0];
            buttonEl.disabled = false;
        };
    },
};


const fp = flatpickr("#datetime-picker", options);

buttonEl.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  buttonEl.disabled = true;
  inputEl.disabled = true;
  Notify.success('Let&#39;s go!');

    timerId = setInterval(() => {
        const deltaTime = selected.getTime() - Date.now();
        if (deltaTime <= 0) {
            clearInterval(timerId);
            Notify.info('Time is up!');
            return;
        }
        
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        dataDaysEl.textContent = addLeadingZero(days);
        dataHoursEl.textContent = addLeadingZero(hours);
        dataMinutesEl.textContent = addLeadingZero(minutes);
        dataSecondsEl.textContent = addLeadingZero(seconds);
    }, 1000);
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = Math.floor(ms / day);
  // Remaining hours
    const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

