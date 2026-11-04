/* ===================================
   AHP Mobil - Particle System
   Interactive Background Particles
   =================================== */

(function () {
    'use strict';

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: undefined, y: undefined };
    let animationId;

    // Configuration
    const config = {
        particleCount: 80,
        maxRadius: 2.5,
        minRadius: 0.5,
        maxSpeed: 0.4,
        connectionDistance: 150,
        mouseRadius: 120,
        colors: [
            'rgba(102, 126, 234, 0.6)',   // primary
            'rgba(118, 75, 162, 0.5)',     // secondary
            'rgba(245, 87, 108, 0.4)',     // accent
            'rgba(79, 172, 254, 0.5)',     // cyan
            'rgba(240, 147, 251, 0.4)',    // pink
        ]
    };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * (config.maxRadius - config.minRadius) + config.minRadius;
            this.speedX = (Math.random() - 0.5) * config.maxSpeed;
            this.speedY = (Math.random() - 0.5) * config.maxSpeed;
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Mouse interaction
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.mouseRadius) {
                    const force = (config.mouseRadius - dist) / config.mouseRadius;
                    this.x += dx * force * 0.02;
                    this.y += dy * force * 0.02;
                }
            }

            // Pulse opacity
            this.pulsePhase += this.pulseSpeed;
            this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? config.particleCount / 2 : config.particleCount;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.connectionDistance) {
                    const opacity = (1 - dist / config.connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Reduce animation when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    // Init
    resizeCanvas();
    initParticles();
    animate();
})();

