import React, { useState, useRef, useEffect } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, useScroll, useTransform } from 'framer-motion';

const skillsData = [
  { name: 'Java', color: '#000000' },
  { name: 'AI/ML', color: '#000000' },
  { name: 'Gen AI', color: '#000000' },
  { name: 'MongoDB', color: '#000000' },
  { name: 'Tailwind', color: '#000000' },
  { name: 'Python', color: '#000000' },
  { name: 'React', color: '#000000' },
  { name: 'Next.js', color: '#000000' },
  { name: 'Cyber Security', color: '#000000' },
  { name: 'Power BI', color: '#000000' },
  { name: 'Tableau', color: '#000000' },
  { name: 'GitHub', color: '#000000' },
  { name: 'Firebase', color: '#000000' },
];

export default function Skills() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.7, 1.0], [1, 0]);

  return (
    <div ref={containerRef} className="w-full flex-grow flex flex-col items-center pt-8 pb-16 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accentPrimary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accentSecondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-4 mb-20 w-full h-24">
        <ParticleHeader 
          text="Technical Skills" 
          subtext="Proprietary 3D Ecosystem"
        />
      </div>
      
      {/* Simple Skills Grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-4 z-10 mb-16">
        {skillsData.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="px-6 py-3 rounded-2xl glass font-bold text-gray-800 shadow-md border-black/10 hover:scale-110 transition-all duration-300 cursor-pointer relative group"
            style={{ borderBottom: `2px solid ${skill.color}` }}
          >
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{ 
                backgroundColor: skill.color,
                boxShadow: `0 0 20px 2px ${skill.color}90`
              }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 drop-shadow-md">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* About Box - Positioned to complement the 'circle' above */}
      <div className="mt-auto w-full flex justify-center z-10 py-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl text-center shadow-xl border border-black/10 bg-white/40 backdrop-blur-3xl mx-4 group hover:border-black/20 transition-colors"
        >
          <div className="h-1 w-20 bg-gradient-to-r from-accentPrimary to-accentSecondary mx-auto mb-8 rounded-full opacity-50" />
          
          <h3 className="mb-6 text-2xl md:text-3xl font-display font-black text-gray-900 tracking-tight uppercase">
            Engineering Strategy
          </h3>
          <p className="text-sm md:text-base text-gray-700 font-sans leading-relaxed transition-colors">
            My development philosophy centers on <span className="text-black font-bold">Performance</span> and 
            <span className="text-black font-bold"> Scalability</span>. I leverage cutting-edge 
            <span className="text-accentPrimary font-bold"> AI models</span> and 
            <span className="text-accentSecondary font-bold"> intuitive UI</span> to transform complex requirements into 
            seamless user journeys. Every skill in this ecosystem represents a pillar of my technical foundation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
