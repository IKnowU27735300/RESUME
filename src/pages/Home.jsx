import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Mail } from 'lucide-react';
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
    <div className="w-full h-full flex flex-col items-start justify-center relative px-4 lg:px-12 min-h-[80vh]">
      
      {/* 3D Keyboard Ambient Background - Fixed to escape App.jsx container, radial mask to blur edges */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-end overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse at 80% 60%, black 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 80% 60%, black 10%, transparent 60%)'
        }}
      >
        <div className="w-[100vw] h-[100vh] mt-20">
          <ThreeKeyboard />
        </div>
      </div>

      {/* Left Content Frontend Overlay */}
      <div className="flex flex-col justify-center items-start space-y-6 relative z-10 w-full max-w-[1200px] bg-darkBg/60 md:bg-transparent p-6 md:p-0 rounded-2xl backdrop-blur-sm md:backdrop-blur-none border border-darkBorder md:border-none">
        
        {/* Added whitespace-nowrap to prevent line breaks in the name while keeping the large 7xl size */}
        <h1 className="text-5xl md:text-[5rem] lg:text-[6rem] leading-none font-display font-extrabold tracking-tight drop-shadow-xl whitespace-nowrap">
          {typedText}
          <motion.span 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-accentPrimary font-light ml-2"
          >
            |
          </motion.span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-300 font-sans tracking-wide drop-shadow-md">
          AI Engineer
        </h2>
        
        <p className="flex items-center text-gray-400 drop-shadow-md pb-4">
          <MapPin className="w-5 h-5 mr-2 text-accentSecondary" />
          Bengaluru, Karnataka, India
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="glass flex items-center justify-center px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all group font-medium shadow-lg hover:shadow-accentPrimary/50">
            Explore Work
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="border border-darkBorder bg-darkBg/80 flex items-center justify-center px-8 py-4 rounded-full hover:bg-darkGlass transition-all font-medium shadow-lg text-white">
            Contact Me
            <Mail className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
