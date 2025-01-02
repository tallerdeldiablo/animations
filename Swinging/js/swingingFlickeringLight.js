const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 400;
canvas.height = 300;

// Light and cord properties
const cordLength = 100;
const lightRadius = 15;
const amplitude = 7; // Amplitude of swing in degrees
const period = 3; // Period of swing in seconds
let flickerIntensity = 100; // Initial light intensity

// Timing for flicker
const minSeg = 1.5; // Minimum interval for steady light
const maxSeg = 2.5; // Maximum interval for steady light
const minFlicker = 0.5; // Minimum duration of flicker
const maxFlicker = 1; // Maximum duration of flicker
let segStartTime = 0;
let segEndTime = 0;
let flickerDuration = 0;

// Start time for animation
let startTime = performance.now();

// Draw the swinging light
function drawSwingingLight(elapsedTime) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate the cord's sway angle
  const angle = amplitude * Math.sin((elapsedTime / 1000) * (Math.PI * 2) / period);

  // Cord position
  const cordX = canvas.width / 2;
  const cordY = 0;

  // Light position
  const lightX = cordX + cordLength * Math.sin((angle * Math.PI) / 180);
  const lightY = cordY + cordLength * Math.cos((angle * Math.PI) / 180);

  // Draw cord
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cordX, cordY);
  ctx.lineTo(lightX, lightY);
  ctx.stroke();

  // Calculate flicker intensity
  calculateFlickerIntensity(elapsedTime / 1000);

  // Draw lightbulb
  ctx.fillStyle = `rgba(255, 255, 100, ${flickerIntensity / 100})`; // Adjust brightness
  ctx.beginPath();
  ctx.arc(lightX, lightY, lightRadius, 0, Math.PI * 2);
  ctx.fill();
}

// Calculate flicker intensity
function calculateFlickerIntensity(currentTime) {
  if (currentTime >= segEndTime) {
    // Start a new segment
    segStartTime = segEndTime;
    segEndTime = segStartTime + random(minSeg, maxSeg);
    flickerDuration = random(minFlicker, maxFlicker);
  }

  if (currentTime > segEndTime - flickerDuration) {
    // Flicker effect
    flickerIntensity = random(0, 100);
  } else {
    // Steady light
    flickerIntensity = 100;
  }
}

// Generate a random value between min and max
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Animation loop
function animate() {
  const elapsedTime = performance.now() - startTime;
  drawSwingingLight(elapsedTime);
  requestAnimationFrame(animate);
}

// Start animation
animate();
