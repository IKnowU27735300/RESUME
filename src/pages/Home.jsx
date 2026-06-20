import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import ThreeKeyboard from '../components/ThreeKeyboard';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const keyboardOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const keyboardScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

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
  
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const [locationCity, setLocationCity] = useState('Vijayapura');
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsKeyboardVisible(latest < 0.85);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setLocationCity(prev => prev === 'Bengaluru' ? 'Vijayapura' : 'Bengaluru');
      }, 100);
      setTimeout(() => {
        setIsGlitching(false);
      }, 300);
    }, 3000); // Loop every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-start justify-center relative min-h-[90vh]">
      
      {/* 3D Keyboard Ambient Background - Fades on scroll to avoid overlap with Experience */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          opacity: keyboardOpacity
        }}
      >
        <motion.div 
          className="w-[100vw] h-[100vh] mt-20 opacity-60 md:opacity-100"
          style={{ scale: keyboardScale }}
        >
          {isKeyboardVisible && <ThreeKeyboard />}
        </motion.div>
      </motion.div>

      {/* Left Content Frontend Overlay */}
      <div className="flex flex-col justify-center items-start space-y-6 md:space-y-8 relative z-10 w-full max-w-[1200px] mt-12 md:mt-0">
        
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-display font-extrabold tracking-tight drop-shadow-2xl">
            <span className="bg-gradient-to-l from-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {typedText}
            </span>
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
        
        <p className="flex items-center text-gray-600 font-medium tracking-wide drop-shadow-md pb-2 sm:pb-4 text-sm sm:text-base">
          <MapPin className="w-5 h-5 mr-3 text-accentSecondary" />
          <span className="relative inline-block mr-1 min-w-[85px]">
            <span 
              className={isGlitching ? "glitch inline-block" : "inline-block"} 
              data-text={locationCity + ","}
            >
              {locationCity},
            </span>
          </span>
           Karnataka, India
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
          <button 
            onClick={() => {
              document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass flex items-center justify-center px-8 py-4 rounded-2xl hover:bg-black/10 hover:text-black text-gray-800 transition-all group font-bold shadow-lg border border-black/10"
          >
            Explore Work
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a 
            href="/Anish_Inamadar.pdf" 
            download="Anish Inamadar.pdf"
            className="border border-black/10 bg-black/5 backdrop-blur-md flex items-center justify-center px-8 py-4 rounded-2xl hover:bg-black/10 transition-all font-bold shadow-lg text-gray-800 group"
          >
            Download CV
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
      
    </div>
  );
}
