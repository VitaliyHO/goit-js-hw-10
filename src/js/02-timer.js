'use strict'

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let timeToEnd = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] <= new Date()){
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
        };
        refs.startBtn.removeAttribute("disabled");
        timeToEnd = selectedDates[0];
    },
  };

flatpickr(refs.dateTimePicker, options);


refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    timerId = setInterval(() => {
        const leftTime = timeToEnd - new Date();
        if(timeToEnd - new Date() < 1000){
            clearInterval(timerId);

        };
        convertMs(leftTime);
    }, 1000)
};

function addLeadingZero(number) {
    return String(number).padStart(2, "0");
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

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  
    return { days, hours, minutes, seconds };
  };