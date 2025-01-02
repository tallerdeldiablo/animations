const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 400;
canvas.height = 300;

// Bar configuration
const barWidth = 5; // Width of the bars
const barHeight = canvas.height; // Height of the bars
const numBars = 10; // Number of bars
const tMin = 0.5; // Minimum segment duration (in seconds)
const tMax = 2.0; // Maximum segment duration (in seconds)

const bars = [];

// Initialize bars
for (let i = 0; i < numBars; i++) {
  bars.push({
    x: Math.random() * canvas.width, // Initial x position
    startX: 0,
    endX: 0,
    startTime: 0,
    endTime: 0,
    state: 'rest',
  });
}

// Update bar positions
function updateBars() {
  const currentTime = performance.now() / 1000; // Current time in seconds

  bars.forEach((bar) => {
    if (bar.state === 'rest') {
      // Generate a new move cycle
      bar.startX = bar.x;
      bar.startTime = currentTime;
      bar.endTime = currentTime + Math.random() * (tMax - tMin) + tMin;
      bar.endX = Math.random() * canvas.width; // Random target position
      bar.state = 'moving';
    }

    if (bar.state === 'moving') {
      const progress = (currentTime - bar.startTime) / (bar.endTime - bar.startTime);

      if (progress >= 1) {
        // End movement, go to rest
        bar.x = bar.endX;
        bar.state = 'rest';
      } else {
        // Ease-in and ease-out motion
        bar.x = ease(progress, bar.startX, bar.endX);
      }
    }
  });
}

// Ease function for smooth motion
function ease(t, start, end) {
  return start + (end - start) * (t * (2 - t)); // Quadratic ease-in-out
}

// Draw bars
function drawBars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bars.forEach((bar) => {
    ctx.fillStyle = 'rgba(255, 100, 100, 0.8)';
    ctx.fillRect(bar.x - barWidth / 2, 0, barWidth, barHeight);
  });
}

// Animation loop
function animate() {
  updateBars();
  drawBars();
  requestAnimationFrame(animate);
}

// Start animation
animate();
