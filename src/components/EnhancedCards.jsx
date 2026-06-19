import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced Card Component with 3D hover effects
 */
export const EnhancedCard = ({
  children,
  className = '',
  glowColor = '#8052ff',
  hoverScale = 1.05,
  hoverLift = -10,
  animated = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 cursor-pointer transition-all ${className}`}
      whileHover={{
        scale: hoverScale,
        y: hoverLift,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        boxShadow: isHovered ? `0 0 30px ${glowColor}60` : '0 0 20px rgba(0,0,0,0.3)',
      }}
    >
      {children}

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={isHovered ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: `radial-gradient(circle, ${glowColor}40, transparent)`,
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};

/**
 * Glass Card Component with enhanced glass-morphism
 */
export const GlassCard = ({
  children,
  className = '',
  intensity = 'medium',
  neon = false,
}) => {
  const intensityMap = {
    light: 'backdrop-blur-md bg-white/2',
    medium: 'backdrop-blur-xl bg-white/5',
    heavy: 'backdrop-blur-2xl bg-white/10',
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 ${intensityMap[intensity]} ${
        neon ? 'border-2 border-accentPrimary shadow-neon-cyan' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Gradient Border Card
 */
export const GradientBorderCard = ({ children, className = '', animated = true }) => {
  return (
    <motion.div
      className="relative p-1 rounded-2xl"
      animate={animated ? { borderColor: ['#8052ff', '#00f0ff', '#00ff9d', '#8052ff'] } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        background: 'linear-gradient(135deg, #8052ff, #00f0ff, #00ff9d, #ff0055)',
        backgroundSize: '300% 300%',
      }}
    >
      <div className={`bg-black rounded-2xl p-6 ${className}`}>{children}</div>
    </motion.div>
  );
};

/**
 * Animated Border Card
 */
export const AnimatedBorderCard = ({ children, className = '' }) => {
  return (
    <div className={`relative p-px rounded-2xl overflow-hidden ${className}`}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, #8052ff, #00f0ff, #00ff9d, #ff0055, #8052ff)',
          backgroundSize: '300% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative bg-black rounded-2xl p-6">{children}</div>
    </div>
  );
};

/**
 * Neon Card Component
 */
export const NeonCard = ({ children, neonColor = 'cyan', className = '' }) => {
  const colorMap = {
    cyan: { glow: '#00f0ff', shadow: 'shadow-neon-cyan' },
    magenta: { glow: '#ff00ff', shadow: 'shadow-neon-magenta' },
    lime: { glow: '#00ff9d', shadow: 'shadow-neon-lime' },
    pink: { glow: '#ff0055', shadow: 'shadow-neon-pink' },
  };

  const colors = colorMap[neonColor] || colorMap.cyan;

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border-2 backdrop-blur-xl bg-black/50 ${colors.shadow} ${className}`}
      style={{
        borderColor: colors.glow,
        boxShadow: `0 0 20px ${colors.glow}80`,
      }}
      whileHover={{
        boxShadow: `0 0 40px ${colors.glow}ff`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Floating Card Component
 */
export const FloatingCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Shimmer Card Component
 */
export const ShimmerCard = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 shimmer pointer-events-none" />
      {children}
    </div>
  );
};

/**
 * 3D Flip Card Component
 */
export const FlipCard = ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className={`relative w-full h-80 cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Front */}
      <motion.div
        className="absolute w-full h-full rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {front}
      </motion.div>

      {/* Back */}
      <motion.div
        className="absolute w-full h-full rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        {back}
      </motion.div>
    </motion.div>
  );
};

/**
 * Hover Expand Card
 */
export const HoverExpandCard = ({ title, children, icon, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 cursor-pointer ${className}`}
      animate={{ height: isExpanded ? 'auto' : '100px' }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={isExpanded ? 'block' : 'hidden'}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/**
 * Stacked Cards Component
 */
export const StackedCards = ({ cards, className = '' }) => {
  return (
    <div className={`relative h-96 ${className}`}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="absolute w-full h-full rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6"
          style={{
            zIndex: cards.length - index,
          }}
          initial={{ y: index * 10, rotate: index * 2 }}
          whileHover={{
            y: 0,
            rotate: 0,
            zIndex: cards.length,
          }}
          transition={{ duration: 0.3 }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Gradient Mesh Card
 */
export const GradientMeshCard = ({ children, className = '' }) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, #8052ff, #00f0ff, #00ff9d, #ff0055)',
          backgroundSize: '300% 300%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative backdrop-blur-xl bg-black/50 p-6 rounded-2xl">{children}</div>
    </div>
  );
};

export default {
  EnhancedCard,
  GlassCard,
  GradientBorderCard,
  AnimatedBorderCard,
  NeonCard,
  FloatingCard,
  ShimmerCard,
  FlipCard,
  HoverExpandCard,
  StackedCards,
  GradientMeshCard,
};
