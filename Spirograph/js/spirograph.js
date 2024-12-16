const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const r1 = 43; 
const r2 = -14; 
const o = 53; 
const v = 15;
const s = 2.5;

let time = 0;

function drawSpirograph() {
    ctx.clearRect(0, 0, compWidth, compHeight);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    let r = r1 + r2; 
    let x = r * Math.cos(time * v) - (r2 + o) * Math.cos(r * time * v / r2); 
    let y = r * Math.sin(time * v) - (r2 + o) * Math.sin(r * time * v / r2); 
    ctx.moveTo(s * x + compWidth / 2, s * y + compHeight / 2);

    for (let t = 0; t < time; t += 0.01) {
        r = r1 + r2; 
        x = r * Math.cos(t * v) - (r2 + o) * Math.cos(r * t * v / r2); 
        y = r * Math.sin(t * v) - (r2 + o) * Math.sin(r * t * v / r2); 
        ctx.lineTo(s * x + compWidth / 2, s * y + compHeight / 2);
    }

    ctx.stroke();
    time += 0.01;
    requestAnimationFrame(drawSpirograph);
}

requestAnimationFrame(drawSpirograph);
