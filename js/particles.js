/**
 * ==============================================================================
 * ✨ CYBER-EMERALD MATRIX SYNAPSE CANVAS
 * ==============================================================================
 * Interactive ambient background mesh with reactive cursor gravity,
 * smooth floating velocity, and glowing node links.
 * ==============================================================================
 */

export function initParticles(canvasId = 'cyberCanvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const mouse = { x: -1000, y: -1000, radius: 160 };

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  };

  const createParticles = () => {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 85);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        size: Math.random() * 2.2 + 1,
        alpha: Math.random() * 0.5 + 0.25,
        color: Math.random() > 0.4 ? 'rgba(16, 185, 129,' : 'rgba(6, 182, 212,'
      });
    }
  };

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  resize();

  const loop = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse repulsion and attraction dynamics
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.x -= (dx / dist) * force * 2.2;
        p.y -= (dy / dist) * force * 2.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw links
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const ldx = p.x - p2.x;
        const ldy = p.y - p2.y;
        const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
        if (ldist < 125) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const linkAlpha = (1 - ldist / 125) * 0.22;
          ctx.strokeStyle = `rgba(16, 185, 129, ${linkAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  };

  loop();
}
