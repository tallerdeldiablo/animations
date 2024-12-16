const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

let master = {
    x: compWidth / 2,
    y: compHeight / 2,
    width: 200,
    height: 150,
    scaleX: 1,
    scaleY: 1
};

// Function to draw the rectangle and its border lines
function draw() {
    ctx.clearRect(0, 0, compWidth, compHeight);
    
    // Calculate the scaled width and height
    const scaledWidth = master.width * master.scaleX;
    const scaledHeight = master.height * master.scaleY;
    
    // Draw the rectangle (master)
    ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
    ctx.fillRect(master.x - scaledWidth / 2, master.y - scaledHeight / 2, scaledWidth, scaledHeight);

    // Border Lines
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    // Lower horizontal line
    const lowerLineY = master.y + (master.height / 2) * master.scaleY;
    ctx.beginPath();
    ctx.moveTo(0, lowerLineY);
    ctx.lineTo(compWidth, lowerLineY);
    ctx.stroke();

    // Upper horizontal line
    const upperLineY = master.y - (master.height / 2) * master.scaleY;
    ctx.beginPath();
    ctx.moveTo(0, upperLineY);
    ctx.lineTo(compWidth, upperLineY);
    ctx.stroke();

    // Right vertical line
    const rightLineX = master.x + (master.width / 2) * master.scaleX;
    ctx.beginPath();
    ctx.moveTo(rightLineX, 0);
    ctx.lineTo(rightLineX, compHeight);
    ctx.stroke();

    // Left vertical line
    const leftLineX = master.x - (master.width / 2) * master.scaleX;
    ctx.beginPath();
    ctx.moveTo(leftLineX, 0);
    ctx.lineTo(leftLineX, compHeight);
    ctx.stroke();
}

// Function to animate the rectangle and border lines
function animate() {
    // Example animation: move and scale the rectangle
    master.x += 1;
    master.y += 0.5;
    master.scaleX = 1 + 0.5 * Math.sin(Date.now() / 1000);
    master.scaleY = 1 + 0.5 * Math.sin(Date.now() / 1000);

    draw();
    requestAnimationFrame(animate);
}

// Start the animation
animate();
