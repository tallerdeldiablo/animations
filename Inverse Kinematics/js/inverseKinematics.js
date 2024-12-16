const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

let upperArm = { x: 200, y: 300, length: 150, angle: 0 };
let lowerArm = { x: 0, y: 0, length: 150, angle: 0 };
let hand = { x: 500, y: 300 };

// Helper function to calculate distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Helper function to clamp a value between a min and max
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Helper function to convert radians to degrees
function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Calculate the rotation of the upper arm
function calculateUpperArmRotation() {
    const A = { x: upperArm.x, y: upperArm.y };
    const B = { x: lowerArm.x, y: lowerArm.y };
    const H = { x: hand.x, y: hand.y };
    const a = distance(A.x, A.y, B.x, B.y);
    const b = distance(B.x, B.y, H.x, H.y);
    const c = distance(H.x, H.y, A.x, A.y);
    const x = (a ** 2 - b ** 2 + c ** 2) / (2 * c);
    const beta = Math.acos(clamp(x / a, -1, 1));
    const delta = Math.atan2(H.y - A.y, H.x - A.x);
    upperArm.angle = radiansToDegrees(delta - beta);
}

// Calculate the rotation of the lower arm
function calculateLowerArmRotation() {
    const A = { x: upperArm.x, y: upperArm.y };
    const B = { x: lowerArm.x, y: lowerArm.y };
    const H = { x: hand.x, y: hand.y };
    const a = distance(A.x, A.y, B.x, B.y);
    const b = distance(B.x, B.y, H.x, H.y);
    const c = distance(H.x, H.y, A.x, A.y);
    const x = (a ** 2 - b ** 2 + c ** 2) / (2 * c);
    const y = c - x;
    const alpha = Math.acos(clamp(y / b, -1, 1));
    const beta = Math.acos(clamp(x / a, -1, 1));
    lowerArm.angle = radiansToDegrees(alpha + beta);
}

// Draw the scene
function draw() {
    ctx.clearRect(0, 0, compWidth, compHeight);

    // Calculate the positions of the joints
    lowerArm.x = upperArm.x + upperArm.length * Math.cos(upperArm.angle * Math.PI / 180);
    lowerArm.y = upperArm.y + upperArm.length * Math.sin(upperArm.angle * Math.PI / 180);
    hand.x = lowerArm.x + lowerArm.length * Math.cos(lowerArm.angle * Math.PI / 180);
    hand.y = lowerArm.y + lowerArm.length * Math.sin(lowerArm.angle * Math.PI / 180);

    // Draw upper arm
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(upperArm.x, upperArm.y);
    ctx.lineTo(lowerArm.x, lowerArm.y);
    ctx.stroke();

    // Draw lower arm
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(lowerArm.x, lowerArm.y);
    ctx.lineTo(hand.x, hand.y);
    ctx.stroke();

    // Draw hand
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(hand.x, hand.y, 10, 0, 2 * Math.PI);
    ctx.fill();
}

// Update the scene
function update() {
    calculateUpperArmRotation();
    calculateLowerArmRotation();
    draw();
}

// Move the hand with mouse events
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    hand.x = event.clientX - rect.left;
    hand.y = event.clientY - rect.top;
    update();
});

// Initial draw
update();
