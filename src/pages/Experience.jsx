import React, { useRef, useState } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, useScroll, useTransform } from 'framer-motion';

const expData = [
  {
    role: "Intern",
    company: "TAP Academy",
    date: "Feb 2026 - Present",
    desc: "Working on advanced projects and gaining full-stack exposure.",
    color: "#000000",
    rotation: -2,
  },
  {
    role: "Junior Software Developer",
    company: "Edutainer",
    date: "Jan 2026 - May 2026",
    desc: "Learnt about Android application development by using Android Studio.",
    color: "#000000",
    rotation: 1,
  },
  {
    role: "General Secretary Of AI&DS",
    company: "Angadi Institute of Technology and Management",
    date: "Sep 2025 - Feb 2026",
    desc: "Led academic and co-curricular initiatives bridging classroom learning with industry readiness.",
    color: "#000000",
    rotation: 2,
  },
  {
    role: "Manager of Marketing",
    company: "ACM Student Chapter",
    date: "Apr 2023 - May 2024",
    desc: "Enhanced student engagement and event visibility leveraging leadership, organizational, and marketing skills.",
    color: "#000000",
    rotation: -1,
  }
];

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.7, 1.0], [1, 0]);

  return (
    <div ref={containerRef} className="w-full flex-grow flex flex-col items-center py-10 relative">
      
      {/* Experience Timeline */}
      <div className="w-full max-w-4xl flex flex-col items-center relative z-10">
        
        <div className="mb-12 w-full h-24">
          <ParticleHeader 
            text="Professional Experience" 
            subtext="Career Roadmap"
            align={window.innerWidth < 1024 ? 'center' : 'left'}
          />
        </div>
        
        <div className="w-full max-w-2xl flex flex-col gap-8 pb-10">
          {expData.map((exp, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, x: 10 }}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-8 md:p-10 rounded-[2.5rem] w-full relative group border border-black/10 bg-white/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 shadow-2xl"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: exp.color }}
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div className="text-[11px] font-display font-black px-4 py-1.5 rounded-full bg-black/5 text-gray-700 border border-black/10 w-fit uppercase tracking-wider backdrop-blur-md">
                    {exp.date}
                  </div>
                  <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
                     <div className="w-2 h-2 rounded-full opacity-40 shadow-[0_0_8px_inset]" style={{ backgroundColor: exp.color }} />
                     <div className="w-2 h-2 rounded-full opacity-20 shadow-[0_0_12px_inset]" style={{ backgroundColor: exp.color }} />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-decorative font-bold mb-3 group-hover:translate-x-1 transition-transform tracking-wider leading-tight" style={{ color: isHovered ? exp.color : '#111' }}>
                  {exp.role}
                </h3>
                <h4 className="text-lg md:text-xl text-gray-800 font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-6 h-[1.5px] bg-gradient-to-r from-black/30 to-transparent rounded-full" />
                  {exp.company}
                </h4>
                <p className="text-gray-600 group-hover:text-gray-900 leading-relaxed font-display font-medium transition-colors text-sm md:text-base md:pr-4">
                  {exp.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
