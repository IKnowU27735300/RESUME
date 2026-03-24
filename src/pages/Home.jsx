import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import ThreeKeyboard from '../components/ThreeKeyboard';

export default function Home() {
  const fullText = "Anish Tanaji Inamadar";
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start justify-center relative px-4 md:px-12 lg:px-24 min-h-[90vh]">
      
      {/* 3D Keyboard Ambient Background - Fixed to escape App.jsx container, radial mask to blur edges */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-end overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse at 80% 60%, black 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 80% 60%, black 10%, transparent 60%)'
        }}
      >
        <div className="w-[100vw] h-[100vh] mt-20 scale-[1.2] md:scale-100 opacity-60 md:opacity-100">
          <ThreeKeyboard />
        </div>
      </div>

      {/* Left Content Frontend Overlay */}
      <div className="flex flex-col justify-center items-start space-y-6 md:space-y-8 relative z-10 w-full max-w-[1200px] mt-12 md:mt-0">
        
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-display font-extrabold tracking-tight drop-shadow-2xl">
            {typedText}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-accentPrimary font-light ml-1"
            >
              |
            </motion.span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gradient font-display font-bold tracking-wider uppercase">
            AI Engineer
          </h2>
        </div>
        
        <p className="flex items-center text-gray-400 font-medium tracking-wide drop-shadow-md pb-2 sm:pb-4 text-sm sm:text-base">
          <MapPin className="w-5 h-5 mr-3 text-accentSecondary" />
          Bengaluru, Karnataka, India
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
          <button 
            onClick={() => {}} // Integration logic if needed
            className="glass flex items-center justify-center px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all group font-bold shadow-lg hover:shadow-accentPrimary/40 border border-white/5"
          >
            Explore Work
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a 
            href="/resume.pdf" 
            download="Resume without pic.pdf"
            className="border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center px-8 py-4 rounded-2xl hover:bg-white/10 transition-all font-bold shadow-lg text-white group"
          >
            Download CV
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
      
    </div>
  );
}
