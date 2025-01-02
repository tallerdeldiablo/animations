const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 400;
canvas.height = 300;

// Image settings
const img = new Image();
img.src = 'http://img.dummy-image-generator.com/abstract/dummy-800x600-Utrecht.jpg'; // Image URL

// Stutter configuration
const startStutter = 1.0; // Time to start stutter effect (in seconds)
const endStutter = 1.5; // Time to end stutter effect (in seconds)
let stutterFrameTime = null; // Holds the frame time to "stutter"

// Animation settings
const frameRate = 30; // Frames per second
const totalFrames = 60; // Total frames in the animation
let currentFrame = 0;

// Start time for animation
let startTime;

// Load image and start animation
img.onload = () => {
  startTime = performance.now();
  animate();
};

// Main animation loop
function animate() {
  const elapsedTime = (performance.now() - startTime) / 1000; // Elapsed time in seconds

  // Determine whether to apply the stutter effect
  if (elapsedTime >= startStutter && elapsedTime <= endStutter) {
    if (stutterFrameTime === null) {
      stutterFrameTime = randomFrameTime(startStutter, endStutter);
    }
  } else {
    stutterFrameTime = null; // Reset stutter effect
  }

  // Use the stutter frame time if within the stutter range
  const frameTime = stutterFrameTime !== null ? stutterFrameTime : elapsedTime;

  // Calculate the current frame
  currentFrame = Math.floor(frameTime * frameRate) % totalFrames;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image frame
  const frameWidth = img.width / totalFrames; // Calculate width of each frame slice
  const sourceX = currentFrame * frameWidth;
  ctx.drawImage(img, sourceX, 0, frameWidth, img.height, 0, 0, canvas.width, canvas.height);

  // Request the next frame
  requestAnimationFrame(animate);
}

// Generate a random time for the stutter effect
function randomFrameTime(start, end) {
  return Math.random() * (end - start) + start;
}
