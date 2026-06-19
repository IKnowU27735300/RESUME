import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll Progress Indicator Component
 * Shows scrolling progress with a gradient line
 */
export const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accentPrimary via-neon-cyan to-neon-lime z-50"
      style={{ width: `${scrollProgress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
};

/**
 * Scroll Indicator - Shows which section is active
 */
export const SectionScrollIndicator = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeSection
                ? 'bg-accentPrimary scale-150'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => {
              const element = document.getElementById(section);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Animated Page Transition Component
 */
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scroll Velocity Tracker Hook
 */
export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const prevScrollY = React.useRef(0);
  const prevTime = React.useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const deltaTime = now - prevTime.current;
      const deltaScroll = window.scrollY - prevScrollY.current;

      if (deltaTime > 0) {
        setVelocity(deltaScroll / deltaTime);
      }

      prevScrollY.current = window.scrollY;
      prevTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return velocity;
};

/**
 * Parallax Scroll Effect Component
 */
export const ParallaxElement = ({ children, offset = 0.5 }) => {
  const [scrollY, setScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div style={{ transform: `translateY(${scrollY * offset}px)` }}>
      {children}
    </motion.div>
  );
};

/**
 * In-view Animation Component
 * Animates elements when they come into view
 */
export const InViewAnimation = ({ children, variants, threshold = 0.5 }) => {
  const ref = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/**
 * Smooth Scroll to Section Component
 */
export const SmoothScrollButton = ({ targetId, children, className = '' }) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.button
      className={className}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

/**
 * Staggered List Animation Component
 */
export const StaggeredList = ({ items = [], renderItem, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * Text Reveal Animation
 */
export const TextReveal = ({ text, className = '' }) => {
  return (
    <div className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0.3,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

/**
 * Counter Animation Component
 */
export const CounterAnimation = ({ from = 0, to = 100, duration = 2, suffix = '' }) => {
  const [count, setCount] = React.useState(from);

  useEffect(() => {
    const range = to - from;
    const increment = range / (duration * 60);
    let current = from;

    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default {
  ScrollProgressIndicator,
  SectionScrollIndicator,
  PageTransition,
  useScrollVelocity,
  ParallaxElement,
  InViewAnimation,
  SmoothScrollButton,
  StaggeredList,
  TextReveal,
  CounterAnimation,
};
