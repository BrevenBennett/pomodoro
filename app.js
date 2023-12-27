const timerMinutes = document.querySelector(".timer__minutes");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMilliseconds = document.querySelector(".timer__milliseconds");
const startButton = document.querySelector(".stopwatch__start");
const stopButton = document.querySelector(".stopwatch__stop");
const resetButton = document.querySelector(".stopwatch__reset");

let startTime;
let cancelId;
let savedTime = 0;
const countdown = 25 * 60 * 1000;

function start() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  startTime = Date.now();
  cancelId = requestAnimationFrame(updateTimer);
  // OR: cancelId = setInterval(updateTimer, 1000 / 60)
}

function stop() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  savedTime += Date.now() - startTime;
  cancelAnimationFrame(cancelId);
  // OR: clearInterval(cancelId)
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
  if (millisLeft < 0) {
    millisLeft = 0;
    cancelAnimationFrame(cancelId);
    // OR: clearInterval(cancelId)
    cancelId = null;
  }

  let secondsLeft = millisLeft / 1000;
  let minutesLeft = secondsLeft / 60;

  timerMilliseconds.innerHTML = zeroPad(millisLeft % 1000, 3);
  timerSeconds.innerHTML = zeroPad(Math.floor(secondsLeft % 60), 2);
  timerMinutes.innerHTML = zeroPad(Math.floor(minutesLeft), 2);

  cancelId = requestAnimationFrame(updateTimer);
}
