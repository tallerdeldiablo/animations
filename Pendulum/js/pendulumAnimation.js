const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

let pendulum = {
    x: compWidth / 2,
    y: 100,
    length: 300,
    width: 10,
    rotation: 0,
    anchorX: compWidth / 2,
    anchorY: 100,
    veloc: 7,
    amplitude: 80,
    decay: 0.7,
    startTime: null
};

// Function to calculate the pendulum rotation
function calculateRotation(time) {
    const elapsed = (time - pendulum.startTime) / 1000; // convert time to seconds
    return pendulum.amplitude * Math.sin(pendulum.veloc * elapsed) / Math.exp(pendulum.decay * elapsed);
}

// Function to draw the scene
function draw(time) {
    if (!pendulum.startTime) pendulum.startTime = time;

    ctx.clearRect(0, 0, compWidth, compHeight);

    // Calculate the pendulum's rotation
    pendulum.rotation = calculateRotation(time);

    // Draw the pendulum rod
    ctx.save();
    ctx.translate(pendulum.anchorX, pendulum.anchorY);
    ctx.rotate(pendulum.rotation * Math.PI / 180);
    ctx.fillStyle = 'brown';
    ctx.fillRect(-pendulum.width / 2, 0, pendulum.width, pendulum.length);

    // Draw the pendulum bob
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0, pendulum.length, 20, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

// Function to animate the scene
function animate(time) {
    draw(time);
    requestAnimationFrame(animate);
}

// Start the animation
animate();
