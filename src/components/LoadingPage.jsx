import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Progress Ring */}
        <div className="relative w-48 h-48 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="4"
              fill="transparent"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="#8052ff"
              strokeWidth="4"
              strokeDasharray={502.6}
              strokeDashoffset={502.6 - (502.6 * percent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-display font-light text-white tracking-widest">
              {percent}%
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-xl font-display font-light tracking-[0.3em] uppercase mb-2 text-white/80">
            Initializing <span className="text-accentPrimary">System</span>
          </h2>
          <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
            Loading 3D Environments & Keyboard Metaphors
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
}
