import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const eduData = [
  {
    role: "B.E in AI & Data Science",
    company: "Angadi Institute of Technology and Management (AITM)",
    date: "2022 - Present",
    desc: "Specializing in AI and Deepening technical expertise in Python and Cybersecurity.",
    review: {
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",
      title: "AITM Campus",
      rating: 4.5,
      desc: "Top engineering college focusing on modern tech."
    }
  },
  {
    role: "Pre-University Degree",
    company: "Tungal Schools",
    date: "2021 - 2022",
    desc: "Focused on foundation sciences and mathematics to build strong analytical skills.",
    review: {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
      title: "Tungal Schools",
      rating: 4.8,
      desc: "Exceptional coaching and discipline."
    }
  },
  {
    role: "High School Education",
    company: "Excellent High School",
    date: "2015 - 2020",
    desc: "Acquired early technical interests and strong academic fundamentals.",
    review: {
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=200&fit=crop",
      title: "Excellent High School",
      rating: 4.6,
      desc: "Great foundation for holistic growth."
    }
  }
];

export default function Education() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">
        Academic <span className="text-gradient">Background</span>
      </h2>
      
      <div className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl relative">
        {eduData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onHoverStart={() => setHoveredIdx(idx)}
            onHoverEnd={() => setHoveredIdx(null)}
            className="glass p-6 md:p-8 rounded-xl relative overflow-visible cursor-default hover:bg-darkGlass"
          >
            <div className="text-sm font-mono text-accentPrimary mb-2">{edu.date}</div>
            <h3 className="text-2xl font-bold mb-1 text-white">{edu.role}</h3>
            <h4 className="text-lg text-gray-400 font-medium">{edu.company}</h4>
            {edu.desc && <p className="text-gray-500 mt-2">{edu.desc}</p>}
            
            {/* Hover Tooltip Overlay */}
            <AnimatePresence>
              {hoveredIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-16 -right-4 md:-right-64 w-64 glass rounded-lg overflow-hidden shadow-2xl z-50 pointer-events-none"
                  style={{ backdropFilter: 'blur(16px)' }}
                >
                  <img src={edu.review.image} alt={edu.review.title} className="w-full h-24 object-cover" />
                  <div className="p-4 bg-[#0a0a0c]/80 text-sm">
                    <strong className="block text-white mb-1">{edu.review.title}</strong>
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                       <Star className="w-4 h-4 fill-current" />
                       <span className="text-xs text-yellow-100">{edu.review.rating} Rating</span>
                    </div>
                    <small className="text-gray-400 block">{edu.review.desc}</small>
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
