import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import ThreeKeyboard from '../components/ThreeKeyboard';
import { GradientText, TextReveal } from '../components/AnimationUtils';
import { SmoothScrollButton } from '../components/ScrollAnimations';

export default function Home() {
  const containerRef = useRef(null);
  const fullHeadline = "Building Ideas One Keystroke At A Time.";
  const [typedHeadline, setTypedHeadline] = useState('');
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    setShowContent(true);
    let i = 0;
    const interval = setInterval(() => {
      setTypedHeadline(fullHeadline.slice(0, i));
      i++;
      if (i > fullHeadline.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <div ref={containerRef} className="w-full flex items-center justify-center relative min-h-screen py-16 md:py-0 overflow-hidden">
      
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 px-4 md:px-8">
        
        {/* Left Side: Typography & CTAs */}
        <motion.div 
          className="lg:col-span-5 flex flex-col justify-center items-start space-y-8 text-left"
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
        >
          
          <motion.div className="space-y-4 w-full" variants={itemVariants}>
            {/* Enhanced Title with Gradient */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.8rem] leading-[1.08] font-display font-light tracking-tight text-white"
              variants={itemVariants}
            >
              <GradientText>{typedHeadline}</GradientText>
              <motion.span 
                animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-neon-cyan font-light ml-1 neon-glow-text"
              >
                _
              </motion.span>
            </motion.h1>
            
            {/* Subtitle with animation */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 font-sans font-light max-w-lg leading-relaxed pt-2"
              variants={itemVariants}
            >
              <span className="text-neon-cyan">
                {"🚀 Junior Software Developer"}
              </span>
              {" specializing in React, Python, AI, Cybersecurity, and Modern Web Experiences."}
            </motion.p>
          </motion.div>
          
          {/* Enhanced CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            variants={itemVariants}
          >
            {/* Primary Pill Button with Enhanced Styling */}
            <motion.button 
              onClick={() => handleScrollToSection('Projects')}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accentPrimary to-neon-cyan hover:shadow-glow-2xl text-white rounded-[24px] uppercase tracking-wider text-sm font-semibold transition-all group active:scale-95 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                View Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            {/* Secondary Outlined Button with Glow */}
            <motion.button 
              onClick={() => handleScrollToSection('Contact')}
              className="flex items-center justify-center px-8 py-4 border-2 border-neon-cyan hover:bg-neon-cyan/10 text-neon-cyan hover:text-neon-cyan rounded-[24px] uppercase tracking-wider text-sm font-semibold transition-all active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Enhanced Status Badge with animations */}
          <motion.div 
            className="flex items-center gap-2 text-neon-cyan font-mono text-xs uppercase tracking-widest pt-2"
            variants={itemVariants}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-neon-cyan" />
            </motion.div>
            <span>System Ready • Let's Create</span>
          </motion.div>

          {/* Floating Badges */}
          <motion.div 
            className="flex flex-wrap gap-3 pt-4"
            variants={itemVariants}
          >
            {['React', 'Python', 'AI/ML', 'Cybersecurity'].map((skill, idx) => (
              <motion.div
                key={skill}
                className="px-4 py-2 rounded-full backdrop-blur-lg bg-white/5 border border-neon-cyan/30 text-neon-cyan text-xs font-semibold"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  delay: idx * 0.1,
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Gigantic Floating Keyboard */}
        <motion.div 
          className="lg:col-span-7 w-full h-[450px] md:h-[600px] lg:h-[750px] flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Glow effect behind keyboard */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-accentPrimary/20 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <ThreeKeyboard />
        </motion.div>
      </div>
      
    </div>
  );
}
