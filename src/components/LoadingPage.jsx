import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingPage() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-darkBg flex flex-col items-center justify-center overflow-hidden">
      {/* Background Pulsing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accentPrimary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accentSecondary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accentTertiary/5 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Progress Ring */}
        <div className="relative w-48 h-48 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="4"
              fill="transparent"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="url(#grad1)"
              strokeWidth="4"
              strokeDasharray={502.6}
              strokeDashoffset={502.6 - (502.6 * percent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#E6BE8A" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-white tracking-widest">
              {percent}%
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-xl font-display font-medium tracking-[0.3em] uppercase mb-2 text-white/80">
            Initializing <span className="text-accentPrimary">System</span>
          </h2>
          <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
            Loading 3D Environments & AI Models
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
}
