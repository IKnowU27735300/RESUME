import React, { useRef, useEffect } from 'react';

const SYMBOLS = ['{', '}', '<', '>', '/', '\\', '[', ']', '=', '+', ';', '#', 'Esc', 'Ctrl', 'Tab', 'Fn', 'A', '1'];
const COLORS = ['#8052ff', '#ffffff', '#ffb829', '#bdbdbd'];

export default function ParticleHeader({ text, className = "", subtext = "", align = 'center', fontFamily = '"Space Grotesk", sans-serif' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000, radius: 55, pressed: false });
  const animationFrameId = useRef(null);

  // Configuration
  const particleGap = 11; // Sparser symbols for clean text clarity
  const returnForce = 0.04; 
  const mouseForce = 0.25; 
  const friction = 0.90; 

  class Particle {
    constructor(x, y, color) {
      this.x = x + (Math.random() - 0.5) * 40; 
      this.y = y + (Math.random() - 0.5) * 40;
      this.originX = x;
      this.originY = y;
      this.color = color;
      this.vx = 0;
      this.vy = 0;
      this.char = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      this.size = Math.random() * 2 + 7; // Slightly smaller symbols
    }

    update() {
      const dx = mouse.current.x - this.x;
      const dy = mouse.current.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.current.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.current.radius - distance) / mouse.current.radius;
        this.vx -= Math.cos(angle) * force * mouseForce * 12;
        this.vy -= Math.sin(angle) * force * mouseForce * 12;
      }
      
      if (mouse.current.pressed && distance < 120) {
        const angle = Math.atan2(dy, dx);
        const force = (120 - distance) / 120;
        this.vx -= Math.cos(angle) * force * 24;
        this.vy -= Math.sin(angle) * force * 24;
      }

      this.vx += (this.originX - this.x) * returnForce;
      this.vy += (this.originY - this.y) * returnForce;

      this.vx *= friction;
      this.vy *= friction;
      
      this.x += this.vx;
      this.y += this.vy;
    }

    draw(ctx) {
      // Semi-transparent particles to not block the main solid text
      const opacity = 0.45;
      if (this.color === '#8052ff') {
        ctx.fillStyle = `rgba(128, 82, 255, ${opacity})`;
      } else if (this.color === '#ffb829') {
        ctx.fillStyle = `rgba(255, 184, 41, ${opacity})`;
      } else if (this.color === '#ffffff') {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      } else {
        ctx.fillStyle = `rgba(189, 189, 189, ${opacity})`;
      }
      ctx.font = `bold ${this.size}px monospace`;
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const container = containerRef.current;
    if (!container) return;
    
    const dpr = window.devicePixelRatio || 1;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    particles.current = [];

    // Temporarily draw solid text to extract pixel positions
    ctx.fillStyle = 'white';
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    
    const fontSize = Math.min(width / (text.length * 0.65), height * 0.55);
    ctx.font = `800 ${fontSize}px ${fontFamily}`;
    
    const xPos = align === 'center' ? width / 2 : (align === 'right' ? width : 0);
    ctx.fillText(text.toUpperCase(), xPos, height / 2);

    const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr).data;
    ctx.clearRect(0, 0, width, height);

    for (let y = 0; y < height * dpr; y += (particleGap * dpr)) {
      for (let x = 0; x < width * dpr; x += (particleGap * dpr)) {
        const index = (Math.floor(y) * Math.floor(width * dpr) + Math.floor(x)) * 4;
        const opacity = imageData[index + 3];
        
        if (opacity > 128) {
          const color = COLORS[Math.floor(Math.random() * COLORS.length)];
          particles.current.push(new Particle(x / dpr, y / dpr, color));
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    
    ctx.clearRect(0, 0, width, height);

    // 1. Render the SOLID, highly readable text first
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    
    const fontSize = Math.min(width / (text.length * 0.65), height * 0.55);
    ctx.font = `800 ${fontSize}px ${fontFamily}`;
    
    const xPos = align === 'center' ? width / 2 : (align === 'right' ? width : 0);
    ctx.fillText(text.toUpperCase(), xPos, height / 2);

    // 2. Render the floating symbols on top
    particles.current.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const runInit = () => {
      if (containerRef.current) init();
    };

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
        className="absolute inset-0 w-full h-full cursor-pointer z-10"
        onMouseMove={handleMouseMove}
        onMouseOut={() => { handleMouseOut(); mouse.current.pressed = false; }}
        onMouseDown={() => { mouse.current.pressed = true; }}
        onMouseUp={() => { mouse.current.pressed = false; }}
      />
      {subtext && (
        <p className={`absolute bottom-0 text-gray-500 font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] transform translate-y-5 pointer-events-none z-0 ${align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left')}`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
