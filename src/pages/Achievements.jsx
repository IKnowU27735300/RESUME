import React, { useState } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Trophy, FileCode, Lightbulb, ExternalLink } from 'lucide-react';

// Import certificates
import AIEssentials from '../../Certificates/AI essentials.png';
import Foundations from '../../Certificates/Foundations.png';
import Mysore from '../../Certificates/Mysore.png';
import PythonBasics from '../../Certificates/python basics HACKERRANK.png';
import ProblemSolving from '../../Certificates/problem solving HACKERRANK.png';

const certs = [
  { name: 'Google AI Essentials', issuer: 'Google', icon: Award, color: '#D4AF37', img: AIEssentials },
  { name: 'Foundations of Cybersecurity', issuer: 'Google', icon: ShieldCheck, color: '#C5A021', img: Foundations },
  { name: 'Mysore Hackathon', issuer: 'Hackathon Participant', icon: Trophy, color: '#E6BE8A', img: Mysore },
  { name: 'Python Basics', issuer: 'Certification', icon: FileCode, color: '#8B7226', img: PythonBasics },
  { name: 'Problem Solving (Basic)', issuer: 'HackerRank', icon: Lightbulb, color: '#D4AF37', img: ProblemSolving }
];

export default function Achievements() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="w-full flex flex-col items-center py-12 relative">
      <div className="text-center mb-16 space-y-4 w-full h-24">
        <ParticleHeader 
          text="Awards & Certificates" 
          subtext="Validating Core Expertise"
        />
      </div>
      
      <div className="flex flex-col xl:flex-row items-start w-full max-w-7xl gap-12 lg:gap-16">
        
        {/* Certifications Grid - Now takes full width but centered */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {certs.map((c, idx) => (
            <motion.a
              key={idx}
              href={c.img}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 md:p-8 rounded-[2rem] flex items-center gap-5 group transition-all duration-500 border border-black/10 hover:bg-black/5 bg-white/50 relative z-10"
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredIdx(idx)}
              onHoverEnd={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl group-hover:rotate-12"
                style={{ backgroundColor: `${c.color}15`, color: c.color }}
              >
                <c.icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                 <h4 className="font-display font-bold text-lg md:text-xl text-gray-900 group-hover:text-accentPrimary transition-colors line-clamp-1">
                   {c.name}
                 </h4>
                 <p className="text-gray-600 text-xs md:text-sm font-sans font-medium uppercase tracking-wider">{c.issuer}</p>
              </div>

              {/* Popup Preview */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 md:w-80 h-48 md:h-60 rounded-2xl overflow-hidden shadow-2xl z-[100] pointer-events-none border border-black/10 bg-white"
                  >
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <a 
          href="https://drive.google.com/drive/u/3/folders/1B0xrlyDggvmL9ja4CRpASt6WgqGrovc3" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accentPrimary hover:scale-105 transition-all shadow-xl active:scale-95 group"
        >
          View All Certificates 
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
