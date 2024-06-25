let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let laps = [];

document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStopBtn').innerText = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStopBtn').innerText = 'Stop';
    }
    isRunning = !isRunning;
}

function pause() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startStopBtn').innerText = 'Start';
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('startStopBtn').innerText = 'Start';
    updateDisplay(true); // Force reset display to 0
    document.getElementById('laps').innerHTML = '';
    laps = [];
}

function lap() {
    if (isRunning) {
        laps.push(elapsedTime);
        displayLaps();
    }
}

function updateDisplay(forceReset = false) {
    if (!forceReset) {
        elapsedTime = Date.now() - startTime;
    }
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    document.getElementById('display').innerText = `${minutes}:${seconds}.${milliseconds}`;
}

function displayLaps() {
    const lapsElement = document.getElementById('laps');
    lapsElement.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const time = new Date(lapTime);
        const minutes = String(time.getUTCMinutes()).padStart(2, '0');
        const seconds = String(time.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${index + 1}: ${minutes}:${seconds}.${milliseconds}`;
        lapsElement.appendChild(lapElement);
    });
}

