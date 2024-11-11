const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const compWidth = canvas.width;
const compHeight = canvas.height;

const strings = [
    { amp: 15, freq: 10, yOffset: compHeight / 3 },
    { amp: 10, freq: 15, yOffset: compHeight / 2 },
    { amp: 20, freq: 5, yOffset: (2 * compHeight) / 3 }
];

let time = 0;

function drawVibratingStrings() {
    ctx.clearRect(0, 0, compWidth, compHeight);

    strings.forEach(string => {
        const { amp, freq, yOffset } = string;
        const oscillation = amp * Math.sin(freq * time * Math.PI * 2);

        // Draw the string
        ctx.beginPath();
        ctx.moveTo(0, yOffset + oscillation);
        ctx.lineTo(compWidth, yOffset - oscillation);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    time += 0.016; // Increment time assuming 60 FPS
    requestAnimationFrame(drawVibratingStrings);
}

requestAnimationFrame(drawVibratingStrings);
