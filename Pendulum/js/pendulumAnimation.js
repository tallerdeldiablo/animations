const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const pendulum = {
    length: canvas.height * 0.8, // Dynamic length based on canvas size
    width: 10, // Fixed rod width
    anchorX: canvas.width / 2,
    anchorY: 20, // Top margin for the anchor
    bobRadius: 20, // Fixed bob size
    veloc: 7, // Speed of oscillation
    amplitude: 80, // Initial swing angle
    decay: 0.7, // Energy loss factor
    startTime: null // Track animation start time
};

// Pendulum rotation calculation (mirrors AE expression)
function calculateRotation(time) {
    const elapsed = time / 1000; // Convert milliseconds to seconds
    return pendulum.amplitude * Math.sin(pendulum.veloc * elapsed) / Math.exp(pendulum.decay * elapsed);
}

// Draw the pendulum
function drawPendulum(rotation) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the current state
    ctx.save();

    // Translate to the anchor point and rotate
    ctx.translate(pendulum.anchorX, pendulum.anchorY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Draw the rod
    ctx.fillStyle = 'brown';
    ctx.fillRect(-pendulum.width / 2, 0, pendulum.width, pendulum.length);

    // Draw the bob
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(0, pendulum.length, pendulum.bobRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Restore original state
    ctx.restore();
}

// Animation loop
function animate(time) {
    if (!pendulum.startTime) pendulum.startTime = time;
    const rotation = calculateRotation(time - pendulum.startTime);
    drawPendulum(rotation);
    requestAnimationFrame(animate);
}

// Start the animation
animate();
