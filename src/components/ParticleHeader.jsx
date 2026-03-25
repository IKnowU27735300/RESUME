import React, { useRef, useEffect } from 'react';

const ParticleHeader = ({ text, className = "", subtext = "", align = 'center', fontFamily = '"Cinzel Decorative", cursive' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000, radius: 35, pressed: false });
  const animationFrameId = useRef(null);

  // Configuration
  const particleGap = 2; // Denser particles for better clarity
  const returnForce = 0.05; 
  const mouseForce = 0.3; 
  const friction = 0.92; 
  
  const colors = ["#D4AF37", "#F1C40F", "#FFD700", "#B8860B", "#E6BE8A"];

  class Particle {
    constructor(x, y, color) {
      this.x = x + (Math.random() - 0.5) * 50; 
      this.y = y + (Math.random() - 0.5) * 50;
      this.originX = x;
      this.originY = y;
      this.color = color;
      this.vx = 0;
      this.vy = 0;
      this.size = Math.random() * 1.5 + 0.5; // Slightly larger particles
    }

    update() {
      const dx = mouse.current.x - this.x;
      const dy = mouse.current.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.current.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.current.radius - distance) / mouse.current.radius;
        this.vx -= Math.cos(angle) * force * mouseForce * 8;
        this.vy -= Math.sin(angle) * force * mouseForce * 8;
      }
      
      if (mouse.current.pressed && distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100;
        this.vx -= Math.cos(angle) * force * 20;
        this.vy -= Math.sin(angle) * force * 20;
      }

      this.vx += (this.originX - this.x) * returnForce;
      this.vy += (this.originY - this.y) * returnForce;

      this.vx *= friction;
      this.vy *= friction;
      
      this.x += this.vx;
      this.y += this.vy;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const container = containerRef.current;
    
    const dpr = window.devicePixelRatio || 1;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    particles.current = [];

    ctx.fillStyle = 'white';
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    
    // Adjusted font size to be smaller as requested
    const fontSize = Math.min(width / (text.length * 0.75), height * 0.6);
    ctx.font = `700 ${fontSize}px ${fontFamily}`; // 700 is usually enough for Cinzel Decorative
    
    const xPos = align === 'center' ? width / 2 : (align === 'right' ? width : 0);
    ctx.fillText(text.toUpperCase(), xPos, height / 2);

    const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr).data;
    ctx.clearRect(0, 0, width, height);

    for (let y = 0; y < height * dpr; y += (particleGap * dpr)) {
      for (let x = 0; x < width * dpr; x += (particleGap * dpr)) {
        const index = (Math.floor(y) * Math.floor(width * dpr) + Math.floor(x)) * 4;
        const opacity = imageData[index + 3];
        
        if (opacity > 128) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          particles.current.push(new Particle(x / dpr, y / dpr, color));
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.current.forEach(p => {
      p.update();
      p.draw(ctx);
    });
    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initial call
    const runInit = () => {
      if (containerRef.current) init();
    };

    // Robust font loading
    if (document.fonts) {
      document.fonts.load(`1em ${fontFamily}`).then(runInit).catch(runInit);
    } else {
      runInit();
    }
    
    animate();
    
    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [text, align]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  const handleMouseOut = () => {
    mouse.current.x = -1000;
    mouse.current.y = -1000;
  };

  return (
    <div ref={containerRef} className={`relative w-full h-24 flex flex-col justify-center ${align === 'center' ? 'items-center' : (align === 'right' ? 'items-end' : 'items-start')} ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseOut={() => { handleMouseOut(); mouse.current.pressed = false; }}
        onMouseDown={() => { mouse.current.pressed = true; }}
        onMouseUp={() => { mouse.current.pressed = false; }}
      />
      {subtext && (
        <p className={`absolute bottom-0 text-gray-400 font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] transform translate-y-4 pointer-events-none ${align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left')}`}>
          {subtext}
        </p>
      )}
    </div>
  );
};

export default ParticleHeader;
