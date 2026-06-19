import React from 'react';
import { motion } from 'framer-motion';

/**
 * Staggered children animation helper
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

/**
 * Parallax scroll animation
 */
export const useParallax = (value, input, output) => {
  return value.get() * ((output - input) / (input.length - 1));
};

/**
 * Float animation variants for elements
 */
export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Glow pulse animation
 */
export const glowPulseVariants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Hover scale animation
 */
export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Rotate animation
 */
export const rotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Slide in from left
 */
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

/**
 * Slide in from right
 */
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

/**
 * Slide in from top
 */
export const slideInTopVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

/**
 * Slide in from bottom
 */
export const slideInBottomVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

/**
 * Fade in animation
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

/**
 * Morph shape animation
 */
export const morphVariants = {
  animate: {
    borderRadius: ['40% 60% 70% 30% / 40% 50% 60% 50%', '70% 30% 46% 54% / 30% 30% 70% 70%', '40% 60% 70% 30% / 40% 50% 60% 50%'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * 3D flip animation
 */
export const flipVariants = {
  rest: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Bounce animation
 */
export const bounceVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shine/Shimmer animation component
 */
export const ShimmerEffect = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    {children}
    <div className="absolute inset-0 shimmer" />
  </div>
);

/**
 * Glow wrapper component
 */
export const GlowWrapper = ({ children, color = '#8052ff', intensity = 'medium', className = '' }) => {
  const shadowMap = {
    low: `0 0 20px ${color}40`,
    medium: `0 0 30px ${color}60`,
    high: `0 0 50px ${color}80`,
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ filter: 'drop-shadow(0 0 20px rgba(128, 82, 255, 0.2))' }}
    >
      {children}
    </div>
  );
};

/**
 * Floating particles background
 */
export const FloatingParticles = ({ count = 5, className = '' }) => {
  const particles = Array.from({ length: count }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-accentPrimary rounded-full"
      variants={floatVariants}
      animate="animate"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.2,
      }}
    />
  ));

  return <div className={`relative w-full h-full ${className}`}>{particles}</div>;
};

/**
 * Gradient text component
 */
export const GradientText = ({ children, className = '' }) => (
  <span className={`gradient-text-hero font-bold ${className}`}>{children}</span>
);

/**
 * Neon glow text component
 */
export const NeonText = ({ children, color = 'cyan', className = '' }) => {
  const colorMap = {
    cyan: 'text-neon-cyan',
    magenta: 'text-neon-magenta',
    lime: 'text-neon-lime',
    pink: 'text-neon-pink',
    orange: 'text-neon-orange',
    blue: 'text-neon-blue',
  };

  return <span className={`${colorMap[color]} neon-glow-text ${className}`}>{children}</span>;
};

/**
 * Scroll reveal animation
 */
export const ScrollRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.7,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  }),
};

/**
 * Scale up animation
 */
export const scaleUpVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

/**
 * Rotate and scale animation
 */
export const rotateScaleVariants = {
  hidden: { rotate: -10, scale: 0.9, opacity: 0 },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

export default {
  containerVariants,
  itemVariants,
  floatVariants,
  glowPulseVariants,
  hoverScaleVariants,
  rotateVariants,
  slideInLeftVariants,
  slideInRightVariants,
  slideInTopVariants,
  slideInBottomVariants,
  fadeInVariants,
  morphVariants,
  flipVariants,
  bounceVariants,
  ScrollRevealVariants,
  scaleUpVariants,
  rotateScaleVariants,
};
