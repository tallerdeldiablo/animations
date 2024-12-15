onst canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const start = 1.0; // time to start random frames
const end = 1.5; // time to end random frames
let time = 0;

function drawFrame(t) {
    ctx.clearRect(0, 0, compWidth, compHeight);

    ctx.fillStyle = 'blue';
    ctx.fillRect((Math.sin(t) + 1) * compWidth / 2 - 25, compHeight / 2 - 25, 50, 50);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Time: ${t.toFixed(2)}`, 10, 30);
}

function drawStutterFrames() {
    let displayTime;
    if (time >= start && time <= end) {
        displayTime = start + Math.random() * (end - start);
    } else {
        displayTime = time;
    }

    drawFrame(displayTime);
    time += 0.016; // Assuming 60 FPS

    requestAnimationFrame(drawStutterFrames);
}

requestAnimationFrame(drawStutterFrames);
