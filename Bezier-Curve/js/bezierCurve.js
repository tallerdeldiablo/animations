const canvas = document.getElementById('bezierCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Anchor and control points
const p0 = { x: 100, y: height - 100 }; // Anchor point 1
const p1 = { x: 300, y: 100 };          // Control point 1
const p2 = { x: 500, y: 100 };          // Control point 2
const p3 = { x: width - 100, y: height - 100 }; // Anchor point 2

// Particles along the curve
const numParticles = 20;
const particles = [];
const curveResolution = 100; // Higher value makes the curve smoother

// Generate particles
for (let i = 0; i < numParticles; i++) {
  particles.push({ t: i / numParticles, offset: 0 });
}

// Bézier curve function
function bezier(t, p0, p1, p2, p3) {
  const c = (1 - t) ** 3 * p0;
  const b = 3 * (1 - t) ** 2 * t * p1;
  const a = 3 * (1 - t) * t ** 2 * p2;
  const d = t ** 3 * p3;
  return c + b + a + d;
}

// Animate particles along the curve
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw the curve
  ctx.beginPath();
  for (let i = 0; i <= curveResolution; i++) {
    const t = i / curveResolution;
    const x = bezier(t, p0.x, p1.x, p2.x, p3.x);
    const y = bezier(t, p0.y, p1.y, p2.y, p3.y);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Update and draw particles
  particles.forEach((particle, index) => {
    particle.offset += 0.005; // Speed of movement
    if (particle.offset > 1) particle.offset = 0; // Reset particle

    const t = (particle.t + particle.offset) % 1;
    const x = bezier(t, p0.x, p1.x, p2.x, p3.x);
    const y = bezier(t, p0.y, p1.y, p2.y, p3.y);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${255 - index * 10}, ${100 + index * 5}, 255, 0.8)`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
