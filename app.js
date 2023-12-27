const timerMinutes = document.querySelector(".timer__minutes");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMilliseconds = document.querySelector(".timer__milliseconds");

let startTime;
let cancelId;
let savedTime = 0;

function start() {
  startTime = 25 * 60 * 1000 + Date.now();
  cancelId = requestAnimationFrame(updateTimer);
}

function stop() {
  savedTime = startTime - savedTime - Date.now() - 25 * 60 * 1000;
  cancelAnimationFrame(cancelId);
}

function reset() {
  startTime = 25 * 60 * 1000 + Date.now();
  savedTime = 0;

  timerMinutes.innerHTML = "25";
  timerSeconds.innerHTML = "00";
  timerMilliseconds.innerHTML = "000";
}

const zeroPad = (num, places) => {
  return String(num).padStart(places, 0);
};

function updateTimer() {
  let millisElapsed = savedTime + startTime - Date.now();
  let secondsElapsed = millisElapsed / 1000;
  let minutesElapsed = secondsElapsed / 60;

  timerMilliseconds.innerHTML = zeroPad(Math.floor(millisElapsed % 1000), 3);
  timerSeconds.innerHTML = zeroPad(Math.floor(secondsElapsed % 60), 2);
  timerMinutes.innerHTML = zeroPad(Math.floor(minutesElapsed), 2);

  cancelId = requestAnimationFrame(updateTimer);
}
