const canvas = document.getElementById('animationCanvas');
if (!canvas) {
    console.error("Canvas element not found");
}
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const amplitude = 7;
const period = 3; // seconds
const minSeg = 1.5;
const maxSeg = 2.5;
const minFlicker = 0.5;
const maxFlicker = 1;
let segStartTime = 0;
let segEndTime = 0;
let i = 1;
let time = 0;

function drawSwingingLight(t) {
    ctx.clearRect(0, 0, compWidth, compHeight);

    // Calculate swaying motion
    const sway = amplitude * Math.sin(t * Math.PI * 2 / period);

    // Draw the cord
    ctx.save();
    ctx.translate(compWidth / 2, 0);
    ctx.rotate(sway * Math.PI / 180);
    ctx.fillStyle = 'black';
    ctx.fillRect(-2, 0, 4, 200);
    ctx.restore();

    // Calculate flickering light intensity
    while (t >= segEndTime) {
        i += 1;
        Math.seedrandom(i);
        segStartTime = segEndTime;
        segEndTime = segEndTime + minSeg + Math.random() * (maxSeg - minSeg);
    }

    let intensity;
    if (t > segEndTime - minFlicker - Math.random() * (maxFlicker - minFlicker)) {
        intensity = Math.random() * 100;
    } else {
        intensity = 100;
    }

    // Draw the bulb
    ctx.save();
    ctx.translate(compWidth / 2, 200);
    ctx.rotate(sway * Math.PI / 180);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw the light effect
    ctx.fillStyle = `rgba(255, 255, 0, ${intensity / 100})`;
    ctx.beginPath();
    ctx.arc(compWidth / 2, 200, 100, 0, Math.PI * 2);
    ctx.fill();

    time += 0.016; // Increment time assuming 60 FPS
    requestAnimationFrame(() => drawSwingingLight(time));
}

requestAnimationFrame(() => drawSwingingLight(time));
