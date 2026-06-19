import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Gradient Mesh Background Component
 * Creates a dynamic, flowing background with multiple animated gradients
 */
export const AnimatedGradientMesh = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated gradient mesh orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(128, 82, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '20%',
          left: '10%',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '50%',
          right: '5%',
        }}
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 157, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '10%',
          left: '50%',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 85, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '80%',
          right: '20%',
        }}
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

/**
 * Mouse-following Ambient Light Component
 * Creates a dynamic light that follows the cursor
 */
export const MouseAmbientLight = () => {
  const lightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={lightRef}
      className="fixed w-96 h-96 pointer-events-none -z-10"
      style={{
        background: 'radial-gradient(circle, rgba(128, 82, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(100px)',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.1s ease-out',
      }}
    />
  );
};

/**
 * Floating Particles Background Component
 * Creates particle effects that float and fade
 */
export const FloatingParticlesBackground = ({ particleCount = 50 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5;
        this.color = ['#8052ff', '#00f0ff', '#00ff9d'][Math.floor(Math.random() * 3)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', setCanvasSize);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

/**
 * Animated Grid Background
 * Creates an animated grid pattern background
 */
export const AnimatedGridBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <svg width="100%" height="100%" className="opacity-5">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated scan lines */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(128, 82, 255, 0.3), transparent)',
        }}
        animate={{ y: ['0%', '100%'] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

/**
 * Orb Background Component
 * Creates floating, morphing orbs
 */
export const OrbBackground = () => {
  const orbs = [
    {
      color: 'rgba(128, 82, 255, 0.2)',
      size: 'w-96 h-96',
      duration: 15,
      delay: 0,
      initialX: '10%',
      initialY: '20%',
    },
    {
      color: 'rgba(0, 240, 255, 0.15)',
      size: 'w-80 h-80',
      duration: 18,
      delay: 2,
      initialX: '80%',
      initialY: '70%',
    },
    {
      color: 'rgba(0, 255, 157, 0.12)',
      size: 'w-72 h-72',
      duration: 20,
      delay: 4,
      initialX: '40%',
      initialY: '80%',
    },
  ];

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      {orbs.map((orb, idx) => (
        <motion.div
          key={idx}
          className={`absolute rounded-full ${orb.size}`}
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            left: orb.initialX,
            top: orb.initialY,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Composite Background with all effects
 */
export const EnhancedBackground = ({ style = 'gradient' }) => {
  const styles = {
    gradient: <AnimatedGradientMesh />,
    grid: <AnimatedGridBackground />,
    orbs: <OrbBackground />,
    particles: <FloatingParticlesBackground />,
  };

  return (
    <>
      {styles[style] || styles.gradient}
      <MouseAmbientLight />
    </>
  );
};

export default {
  AnimatedGradientMesh,
  MouseAmbientLight,
  FloatingParticlesBackground,
  AnimatedGridBackground,
  OrbBackground,
  EnhancedBackground,
};
