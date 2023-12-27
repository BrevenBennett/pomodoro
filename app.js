const timerMinutes = document.querySelector(".timer__minutes");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMilliseconds = document.querySelector(".timer__milliseconds");

let startTime;
let cancelId;
let savedTime = 0;
const countdown = 25 * 60 * 1000;

function start() {
  startTime = Date.now();
  cancelId = requestAnimationFrame(updateTimer);
}

function stop() {
  savedTime += Date.now() - startTime;
  cancelAnimationFrame(cancelId);
}

function reset() {
  startTime = Date.now();
  savedTime = 0;

  timerMinutes.innerHTML = "25";
  timerSeconds.innerHTML = "00";
  timerMilliseconds.innerHTML = "000";
}

const zeroPad = (num, places) => {
  return String(num).padStart(places, 0);
};

function updateTimer() {
  let millisElapsed = Date.now() - startTime + savedTime;

  let millisLeft = countdown - millisElapsed;
  let secondsLeft = millisLeft / 1000;
  let minutesLeft = secondsLeft / 60;

  timerMilliseconds.innerHTML = zeroPad((millisLeft % 1000), 3);
  timerSeconds.innerHTML = zeroPad(Math.floor(secondsLeft % 60), 2);
  timerMinutes.innerHTML = zeroPad(Math.floor(minutesLeft), 2);

  cancelId = requestAnimationFrame(updateTimer);
}
