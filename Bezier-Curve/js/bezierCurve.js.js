const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Define the control points for the Bezier curve
const p0 = { x: 100, y: 500 }; // Start point (Null 1)
const p1 = { x: 300, y: 100 }; // Control point 1 (Null 2)
const p2 = { x: 500, y: 100 }; // Control point 2 (Null 3)
const p3 = { x: 700, y: 500 }; // End point (Null 4)

// Number of objects along the curve
const numObjects = 50;
const objects = [];

// Create objects to animate along the curve
for (let i = 0; i < numObjects; i++) {
    objects.push({ t: i / (numObjects - 1) });
}

// Function to calculate a point on the Bezier curve
function calculateBezierPoint(t, p0, p1, p2, p3) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const x = (uuu * p0.x) + (3 * uu * t * p1.x) + (3 * u * tt * p2.x) + (ttt * p3.x);
    const y = (uuu * p0.y) + (3 * uu * t * p1.y) + (3 * u * tt * p2.y) + (ttt * p3.y);

    return { x, y };
}

// Function to animate the objects along the curve
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the Bezier curve
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw and update the objects along the curve
    objects.forEach(obj => {
        const pos = calculateBezierPoint(obj.t, p0, p1, p2, p3);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
    });

    // Update the parameter t for each object to move along the curve
    objects.forEach(obj => {
        obj.t += 0.005;
        if (obj.t > 1) obj.t = 0;
    });

    requestAnimationFrame(animate);
}

// Start the animation
animate();
