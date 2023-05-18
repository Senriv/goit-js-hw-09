import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
  datePicker: document.querySelector('#datetime-picker'),
};

let idTimer = null;

refs.btnStart.setAttribute('disabled', 'disabled');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const padValue = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.removeAttribute('disabled');
    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      refs.days.textContent = days;
      refs.hours.textContent = padValue(hours);
      refs.minutes.textContent = padValue(minutes);
      refs.seconds.textContent = padValue(seconds);

      if (
        refs.days.textContent === '0' &&
        refs.hours.textContent === '00' &&
        refs.minutes.textContent === '00' &&
        refs.seconds.textContent === '00'
      ) {
        clearInterval(idTimer);
      }
    };

    const onClick = () => {
      if (idTimer) {
        clearInterval(idTimer);
      }
      showTimer();
      idTimer = setInterval(showTimer, 1000);
    };

    refs.btnStart.addEventListener('click', onClick);
  },
};

flatpickr('input#datetime-picker', options);
