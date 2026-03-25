import React, { useState } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { EducationLeft3D, EducationRight3D } from '../components/Education3D';

const eduData = [
  {
    role: "B.E in AI & Data Science",
    company: "Angadi Institute of Technology and Management (AITM)",
    date: "2022 - Present",
    url: "https://aitmbgm.ac.in/",
    desc: "A NAAC and NBA accredited institution affiliated with VTU, offering specialized B.E. programs in AI & Data Science and Robotics with a focus on holistic development and industry readiness.",
    review: {
      image: "/aitm_preview.png",
      title: "AITM Campus Website",
      rating: 4.5,
      desc: "Affiliated with VTU, Belagavi and recognized by AICTE, New Delhi."
    }
  },
  {
    role: "Pre-University Degree",
    company: "Tungal Schools",
    date: "2021 - 2022",
    url: "https://www.tungalschools.com/copy-of-jkd-campus",
    desc: "Completed a two-year integrated PUC course specializing in PCMB, featuring intensive coaching for competitive exams like NEET, JEE, and KCET.",
    review: {
      image: "/tungal_preview.png",
      title: "Tungal Schools Website",
      rating: 4.8,
      desc: "Reputed for intensive coaching and academic excellence in Vijaypura."
    }
  },
  {
    role: "High School Education",
    company: "Excellent High School",
    date: "2015 - 2020",
    url: "https://www.excellentschool.in/",
    desc: "A pre-eminent learning center dedicated to producing future leaders with a global outlook through high-quality, value-based education.",
    review: {
      image: "/excellent_preview.png",
      title: "Excellent School Website",
      rating: 4.6,
      desc: "Focused on holistic growth and high-quality modern education."
    }
  }
];

export default function Education() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="w-full relative flex flex-col items-center py-12 mb-20">
      <div className="relative z-10 text-center space-y-4 mb-16 w-full h-24">
        <ParticleHeader 
          text="Academic Background" 
          subtext="Journey of Learning"
        />
      </div>

      {/* 3D Side Decorations */}
      <EducationLeft3D />
      <EducationRight3D />
      
      <div className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl relative z-10">
        {eduData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onHoverStart={() => setHoveredIdx(idx)}
            onHoverEnd={() => setHoveredIdx(null)}
            onClick={() => window.open(edu.url, '_blank')}
            className="glass p-6 md:p-10 rounded-3xl relative cursor-pointer group hover:bg-white/5 border border-white/5 transition-all duration-500 shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs font-mono px-3 py-1 rounded-full bg-accentPrimary/10 text-accentPrimary border border-accentPrimary/20">
                {edu.date}
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-2 leading-tight">
              {edu.role}
            </h3>
            <h4 className="text-lg text-gray-400 font-medium mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accentSecondary" />
              {edu.company}
            </h4>
            
            {edu.desc && (
              <p className="text-sm md:text-base text-gray-500 leading-relaxed font-sans group-hover:text-gray-300 transition-colors">
                {edu.desc}
              </p>
            )}
            
            <div className="mt-6 flex items-center text-[10px] sm:text-xs font-bold text-accentPrimary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Click to Explore Institution <Star className="w-3 h-3 ml-2 fill-current" />
            </div>
            
            {/* Hover Tooltip Overlay - Responsive placement */}
            <AnimatePresence>
              {hoveredIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-full md:bottom-auto md:top-0 md:ml-8 mb-4 md:mb-0 w-[280px] glass rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] pointer-events-none border border-white/10 backdrop-blur-3xl"
                >
                  <div className="relative h-32 w-full overflow-hidden">
                    <img src={edu.review.image} alt={edu.review.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent" />
                  </div>
                  <div className="p-5 bg-darkBg/60">
                    <strong className="block text-white text-base mb-2 font-display">{edu.review.title}</strong>
                    <div className="flex items-center gap-1.5 text-yellow-400 mb-3">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(edu.review.rating) ? 'fill-current' : 'opacity-30'}`} />
                       ))}
                       <span className="text-[10px] text-yellow-100/60 ml-1">{edu.review.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-1">{edu.review.desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
