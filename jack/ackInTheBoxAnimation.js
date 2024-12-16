const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

let jack = {
    x: compWidth / 2,
    y: compHeight / 2,
    initialY: compHeight / 2,
    veloc: 35,
    amplitude: 30,
    decay: 1.0,
    startTime: null
};

// Function to calculate the bouncy motion of Jack
function calculateBounce(time) {
    const elapsed = (time - jack.startTime) / 1000; // convert time to seconds
    const y = jack.amplitude * Math.cos(jack.veloc * elapsed) / Math.exp(jack.decay * elapsed);
    return y;
}

// Function to draw the scene
function draw(time) {
    if (!jack.startTime) jack.startTime = time;
    
    ctx.clearRect(0, 0, compWidth, compHeight);

    // Draw the box
    ctx.fillStyle = 'brown';
    ctx.fillRect(jack.x - 50, jack.initialY, 100, 100);

    // Calculate Jack's bouncy position
    const bounceY = calculateBounce(time);
    jack.y = jack.initialY - 50 + bounceY;

    // Draw Jack
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(jack.x, jack.y, 25, 0, 2 * Math.PI);
    ctx.fill();
}

// Function to animate the scene
function animate(time) {
    draw(time);
    requestAnimationFrame(animate);
}

// Start the animation
animate();
