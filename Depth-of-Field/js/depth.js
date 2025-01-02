const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 400;
canvas.height = 300;

// Object and camera settings
const object = { x: canvas.width / 2, y: canvas.height / 2, z: 300, radius: 40 }; // The "ghost" object
const camera = { x: canvas.width / 2, y: canvas.height / 2, z: 0, focalLength: 100 }; // Camera
const focusDistance = object.z; // Initial focus distance

// Depth of field range
const nearFocus = 50; // Distance at which objects start to blur
const farFocus = 500; // Distance beyond which objects are fully blurred

// Animation state
let objectDirection = 1; // Moving closer (+1) or farther (-1)

// Calculate blur based on depth
function calculateBlur(distance) {
  if (distance < nearFocus || distance > farFocus) {
    return 5; // Max blur for objects outside focus range
  }
  const focusRange = farFocus - nearFocus;
  const blurFactor = Math.abs(distance - focusDistance) / focusRange;
  return blurFactor * 5; // Scale blur up to a maximum of 5
}

// Draw object with blur
function drawObject(object, blur) {
  ctx.filter = `blur(${blur}px)`; // Apply blur effect
  ctx.fillStyle = 'rgba(255, 100, 100, 1)';
  ctx.beginPath();
  ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2); // Increased radius
  ctx.fill();
  ctx.filter = 'none'; // Reset filter
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update object position (simulate movement along z-axis)
  object.z += objectDirection * 2;
  if (object.z > 500 || object.z < 50) {
    objectDirection *= -1; // Reverse direction when hitting bounds
  }

  // Calculate blur based on object's distance from focus
  const blur = calculateBlur(object.z);

  // Draw object
  drawObject(object, blur);

  // Draw depth info
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText(`Object Depth: ${object.z}`, 10, 20);
  ctx.fillText(`Blur: ${blur.toFixed(2)}px`, 10, 40);

  requestAnimationFrame(animate);
}

// Start animation
animate();
