import React, { useEffect, useRef } from 'react';

const SYMBOLS = ['{', '}', '<', '>', '(', ')', '[', ']', '#', '=', '/', '+', '-', '*'];

export default function CursorEffects() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.char = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        this.alpha = 1;
        this.decay = 0.03 + Math.random() * 0.02;
        this.size = 11 + Math.random() * 6;
        // Float in a random upward-ish direction
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -0.5 - Math.random() * 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(context) {
        context.fillStyle = `rgba(128, 82, 255, ${this.alpha})`; // Electric Violet
        context.font = `bold ${this.size}px monospace`;
        context.fillText(this.char, this.x, this.y);
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update();
        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      mouse.current.x = x;
      mouse.current.y = y;
      mouse.current.active = true;

      // Distance moved since last symbol creation
      const dx = x - mouse.current.lastX;
      const dy = y - mouse.current.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 15) {
        particles.current.push(new Particle(x, y));
        mouse.current.lastX = x;
        mouse.current.lastY = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
