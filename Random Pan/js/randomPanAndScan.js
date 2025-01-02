const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 400;
canvas.height = 300;

// Image settings
const img = new Image();
img.src = 'http://img.dummy-image-generator.com/abstract/dummy-800x600-Utrecht.jpg'; // Image URL
const scaleTime = 1; // Time to transition between scales (in seconds)
const holdTime = 0.5; // Time to hold at each scale (in seconds)
const maxScale = 2; // Maximum scale factor
let minScale; // Minimum scale factor (calculated dynamically)
const totalTime = scaleTime + holdTime;

// State variables
let startTime = performance.now() / 1000;
let oldScale, newScale, oldPos, newPos;

img.onload = () => {
  // Calculate minimum scale to ensure the canvas is filled
  minScale = Math.max(canvas.width / img.width, canvas.height / img.height);

  // Initialize scales and positions
  oldScale = random(minScale, maxScale);
  newScale = random(minScale, maxScale);
  oldPos = randomPosition(oldScale);
  newPos = randomPosition(newScale);

  // Start animation
  animate();
};

// Generate a random position within bounds for a given scale
function randomPosition(scale) {
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;

  const maxX = (scaledWidth - canvas.width) / 2;
  const minX = -maxX;
  const maxY = (scaledHeight - canvas.height) / 2;
  const minY = -maxY;

  return [random(minX, maxX), random(minY, maxY)];
}

// Generate a random value between min and max
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Ease function for smooth transitions
function ease(t, start, end) {
  return start + (end - start) * (t * (2 - t)); // Quadratic ease-in-out
}

// Main animation loop
function animate() {
  const currentTime = performance.now() / 1000;
  const elapsed = currentTime - startTime;
  const segTime = elapsed % totalTime;

  if (segTime > scaleTime) {
    // Update for the next cycle
    oldScale = newScale;
    newScale = random(minScale, maxScale);
    oldPos = newPos;
    newPos = randomPosition(newScale);
    startTime = currentTime - segTime; // Align start time
  }

  // Calculate current scale and position
  let currentScale, currentPos;
  if (segTime <= scaleTime) {
    const percent = segTime / scaleTime;
    currentScale = ease(percent, oldScale, newScale);
    currentPos = [
      ease(percent, oldPos[0], newPos[0]),
      ease(percent, oldPos[1], newPos[1]),
    ];
  } else {
    currentScale = newScale;
    currentPos = newPos;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(currentScale, currentScale);
  ctx.translate(-currentPos[0] - img.width / 2, -currentPos[1] - img.height / 2);
  ctx.drawImage(img, 0, 0);
  ctx.restore();

  requestAnimationFrame(animate);
}
