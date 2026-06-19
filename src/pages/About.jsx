import React from 'react';
import { motion } from 'framer-motion';
import ThreeSwitch from '../components/ThreeSwitch';
import ParticleHeader from '../components/ParticleHeader';

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
      
      {/* Page Header */}
      <div className="text-center mb-16 space-y-4 w-full h-24 relative z-10">
        <ParticleHeader 
          text="Core Philosophy" 
          subtext="About the Developer"
        />
      </div>

      <div className="w-full max-w-7xl flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-0 items-center justify-center relative z-10 px-6">
        
        {/* Left Side: Minimal Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center items-start space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-light uppercase tracking-wide text-white leading-tight">
              One Key At A Time.
            </h3>
            <div className="w-12 h-0.5 bg-accentPrimary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-secondary font-sans leading-relaxed text-base sm:text-lg text-gray-300"
          >
            My engineering strategy is built on key fundamentals: writing highly efficient code, prioritizing fast response times, and wrapping logic in beautiful, interactive visual layers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted font-sans leading-relaxed text-sm sm:text-base text-gray-400"
          >
            Instead of relying on heavy assets and decorations, depth is created through spacing, contrast, motion, and 3D objects. Every keystroke is an deliberate action, just like every line of code.
          </motion.p>
        </div>

        {/* Right Side: 3D Mechanical Switch */}
        <div className="lg:col-span-7 w-full h-[350px] md:h-[500px] flex items-center justify-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <ThreeSwitch />
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
