const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const maxDev = 13; // max deviation in pixels
const spd = 30;  // speed of oscillation
const decay = 1.0; // how fast it slows down

let time = 0;

function drawSquashAndStretch() {
    ctx.clearRect(0, 0, compWidth, compHeight);

    const t = time;
    const originalScale = 100; // Assuming the original scale is 100 for both x and y
    const x = originalScale + maxDev * Math.sin(spd * t) / Math.exp(decay * t);
    const y = originalScale * originalScale / x;

    ctx.save();
    ctx.translate(compWidth / 2, compHeight - 50); // Move to the bottom center of the canvas
    ctx.scale(x / 100, y / 100); // Apply the squash and stretch effect
    ctx.fillStyle = 'blue';
    ctx.fillRect(-25, -50, 50, 100); // Draw the object
    ctx.restore();

    time += 0.01;
    requestAnimationFrame(drawSquashAndStretch);
}

requestAnimationFrame(drawSquashAndStretch);
