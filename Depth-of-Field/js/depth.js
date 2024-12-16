const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

let camera = {
    position: { x: compWidth / 2, y: compHeight / 2, z: 500 },
    focalDistance: 500,
};

let ghost = {
    position: { x: compWidth / 2, y: compHeight / 2, z: 0 },
    speed: 2,
};

// Function to calculate the dot product of two vectors
function dotProduct(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

// Function to normalize a vector
function normalize(vec) {
    const length = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    return { x: vec.x / length, y: vec.y / length, z: vec.z / length };
}

// Function to calculate the camera's focus distance
function calculateFocusDistance() {
    const P1 = {
        x: ghost.position.x - camera.position.x,
        y: ghost.position.y - camera.position.y,
        z: ghost.position.z - camera.position.z,
    };
    const P2 = normalize({ x: 0, y: 0, z: -1 });
    return dotProduct(P1, P2);
}

// Function to draw the scene
function draw() {
    ctx.clearRect(0, 0, compWidth, compHeight);

    // Calculate the focus distance based on the ghost's position
    camera.focalDistance = calculateFocusDistance();

    // Simulate depth of field by changing the blur based on focus distance
    const blurAmount = Math.abs(camera.focalDistance - ghost.position.z) / 100;

    // Draw background object (blurred based on depth of field)
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(compWidth / 2, compHeight / 2, 50, 0, 2 * Math.PI);
    ctx.fill();

    // Draw ghost (always in focus)
    ctx.filter = 'none';
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(ghost.position.x, ghost.position.y, 15, 0, 2 * Math.PI);
    ctx.fill();
}

// Function to animate the scene
function animate() {
    // Update ghost's position
    ghost.position.z += ghost.speed;
    if (ghost.position.z > 500 || ghost.position.z < 0) {
        ghost.speed *= -1;
    }

    draw();
    requestAnimationFrame(animate);
}

// Start the animation
animate();
