import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Trophy, FileCode, Lightbulb, ExternalLink } from 'lucide-react';
import ThreeTrophy from '../components/ThreeTrophy';

const certs = [
  { name: 'Google AI Essentials', issuer: 'Google', icon: Award, color: '#4285F4', img: 'Certificate (2).png' },
  { name: 'Foundations of Cybersecurity', issuer: 'Google', icon: ShieldCheck, color: '#00ff9d', img: 'Certificate (3).png' },
  { name: 'Mysore Hackathon', issuer: 'Hackathon Participant', icon: Trophy, color: '#bc13fe', img: 'Certificate (1).png' },
  { name: 'Python Basics', issuer: 'Certification', icon: FileCode, color: '#00f0ff', img: 'python.png' },
  { name: 'Problem Solving (Basic)', issuer: 'HackerRank', icon: Lightbulb, color: '#ff0055', img: 'problem solving.png' }
];

export default function Achievements() {
  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">
        Achievements & <span className="text-gradient">Certifications</span>
      </h2>
      
      <div className="flex flex-col xl:flex-row items-center w-full max-w-6xl gap-12">
        {/* Left: Certifications Grid */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, idx) => (
            <motion.a
              key={idx}
              href={`/${c.img}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-xl flex items-center gap-4 group transition-colors"
              whileHover={{ y: -5, borderColor: c.color }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg"
                style={{ backgroundColor: `${c.color}20`, color: c.color }}
              >
                <c.icon className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="font-bold text-white group-hover:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': c.color }}>
                   {c.name}
                 </h4>
                 <p className="text-gray-400 text-sm font-sans">{c.issuer}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Right: 3D Trophy */}
        <div className="flex-1 w-full max-w-sm glass rounded-2xl p-6 flex flex-col items-center border border-accentPrimary/20 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
          <h3 className="text-xl font-bold mb-2 text-yellow-500 text-center">Award of Excellence</h3>
          <p className="text-sm text-gray-400 mb-6 text-center">Rotate me!</p>
          <ThreeTrophy />
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href="https://drive.google.com/drive/folders/1B0xrlyDggvmL9ja4CRpASt6WgqGrovc3" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 bg-accentPrimary text-black rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          View All Certificates <ExternalLink className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  );
}
