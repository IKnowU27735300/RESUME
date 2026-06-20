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
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center overflow-hidden bg-jitter">
      
      {/* Old TV Static & Scanlines */}
      <div className="absolute inset-0 tv-static mix-blend-multiply z-0" />
      <div className="absolute inset-0 crt-scanlines z-0" />
      <div className="relative flex flex-col items-center z-10">
        
        {/* Glitch Name */}
        <div className="glitch-wrapper mb-8">
          <h1 
            className="glitch text-2xl sm:text-4xl md:text-5xl font-display font-black text-gray-900 tracking-wider uppercase whitespace-pre-wrap text-center" 
            data-text="Anish   Tanaji   Inamadar"
          >
            Anish   Tanaji   Inamadar
          </h1>
        </div>
        
        {/* Cyberpunk/Game Style Progress Bar */}
        <div className="w-64 max-w-[80vw] flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              System Boot
            </span>
            <span className="text-xs font-mono font-black text-gray-900">
              {percent}%
            </span>
          </div>
          
          <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gray-900 transition-all duration-75 ease-linear"
              style={{ width: `${percent}%` }}
            />
            {/* Glitchy loading overlay on bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-white/50 animate-pulse"
              style={{ width: `${percent}%`, mixBlendMode: 'overlay' }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
