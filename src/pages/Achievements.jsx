import React from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Trophy, FileCode, Lightbulb, ExternalLink } from 'lucide-react';
import ThreeTrophy from '../components/ThreeTrophy';

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
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-12">
      <div className="text-center mb-16 space-y-4 w-full h-24">
        <ParticleHeader 
          text="Awards & Certificates" 
          subtext="Validating Core Expertise"
        />
      </div>
      
      <div className="flex flex-col xl:flex-row items-start w-full max-w-7xl gap-12 lg:gap-16">
        
        {/* Left: Certifications Grid */}
        <div className="flex-[2] w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {certs.map((c, idx) => (
            <motion.a
              key={idx}
              href={c.img}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 md:p-8 rounded-[2rem] flex items-center gap-5 group transition-all duration-500 border border-white/5 hover:bg-white/5"
              whileHover={{ y: -8, scale: 1.02 }}
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
                 <h4 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-accentPrimary transition-colors line-clamp-1">
                   {c.name}
                 </h4>
                 <p className="text-gray-500 text-xs md:text-sm font-sans font-medium uppercase tracking-wider">{c.issuer}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Right: 3D Trophy Showcase */}
        <div className="flex-1 w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full glass rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center border border-accentPrimary/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
               <Trophy className="w-12 h-12 text-accentPrimary" />
            </div>
            
            <h3 className="text-2xl font-display font-black mb-1 text-white tracking-tight uppercase">Excellence</h3>
            <p className="text-[10px] text-accentPrimary font-black mb-8 uppercase tracking-[0.2em] opacity-60 italic">Rotate to Inspect</p>
            
            <div className="w-full aspect-square md:h-[350px]">
              <ThreeTrophy />
            </div>
          </motion.div>
          
          <div className="mt-8">
            <a 
              href="https://drive.google.com/drive/folders/1B0xrlyDggvmL9ja4CRpASt6WgqGrovc3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accentPrimary hover:scale-105 transition-all shadow-2xl active:scale-95 group"
            >
              View All Certificates 
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
