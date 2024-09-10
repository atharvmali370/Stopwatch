let startTime, updatedTime, difference, tInterval;
let running = false;
let lapsArray = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 1);
    running = true;
  }
}

function stopStopwatch() {
  if (running) {
    clearInterval(tInterval);
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00.000";
  lapsArray = [];
  updateLaps();
}

function lapStopwatch() {
  if (running) {
    lapsArray.push(display.textContent);
    updateLaps();
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = difference % 1000;
  
  display.textContent = 
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 100 ? milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds : milliseconds);
}

function updateLaps() {
  lapsList.innerHTML = "";
  lapsArray.forEach((lap, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);
