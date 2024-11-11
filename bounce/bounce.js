
        (function() {
          const canvas = document.getElementById('animationCanvas');
          const ctx = canvas.getContext('2d');
        
          const ball = {
            x: canvas.width / 2,
            y: 50,
            radius: 20,
            velocityY: 0,
            acceleration: 0.5,
            damping: 0.8,
            bounce: -0.7
          };
        
          function drawBall() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.closePath();
          }
        
          function updateBall() {
            ball.velocityY += ball.acceleration;
            ball.y += ball.velocityY;
        
            if (ball.y + ball.radius > canvas.height) {
              ball.y = canvas.height - ball.radius;
              ball.velocityY *= ball.bounce;
              ball.velocityY *= ball.damping;
            }
          }
        
          function animate() {
            updateBall();
            drawBall();
            requestAnimationFrame(animate);
          }
        
          animate();
        })();
