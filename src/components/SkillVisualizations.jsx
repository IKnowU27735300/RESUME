import React from 'react';
import { motion } from 'framer-motion';

/**
 * Circular Skill Proficiency Component
 * Shows skills with animated circular progress bars
 */
export const SkillProficiency = ({ name, proficiency = 85, icon, color = '#8052ff' }) => {
  const circumference = 282.7; // 2 * PI * 45
  const strokeDashoffset = circumference * (1 - proficiency / 100);

  return (
    <motion.div
      className="flex flex-col items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}60` }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-24 h-24 relative">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            transition={{ duration: 2, ease: 'easeOut' }}
            viewport={{ once: true }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <span className="text-2xl font-bold text-white">{proficiency}%</span>
          )}
        </div>
      </div>
      
      <h3 className="text-white font-bold text-center">{name}</h3>
      <p className="text-xs text-gray-400 text-center">{proficiency}% Proficiency</p>
    </motion.div>
  );
};

/**
 * Animated Skill Bar Component
 */
export const SkillBar = ({ name, proficiency = 85, color = '#8052ff', icon }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-semibold text-white">{name}</span>
        </div>
        <motion.span
          className="text-sm font-bold"
          style={{ color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {proficiency}%
        </motion.span>
      </div>
      
      {/* Background bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        {/* Animated progress bar */}
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

/**
 * Radar/Spider Chart for Skills
 */
export const SkillRadarChart = ({ skills = [] }) => {
  const chartSize = 300;
  const center = chartSize / 2;
  const levels = 5;
  const radius = (chartSize / 2) * 0.8;
  const maxValue = 100;

  const angleSlice = (Math.PI * 2) / skills.length;

  // Generate the polygon points for the skill levels
  const generatePolygon = (skill, index) => {
    const angle = angleSlice * index - Math.PI / 2;
    const value = skill.proficiency;
    const x = center + (radius * (value / maxValue)) * Math.cos(angle);
    const y = center + (radius * (value / maxValue)) * Math.sin(angle);
    return `${x},${y}`;
  };

  const polygonPoints = skills.map((skill, idx) => generatePolygon(skill, idx)).join(' ');

  return (
    <div className="w-full flex justify-center p-8">
      <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
        {/* Background levels */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = (radius * (i + 1)) / levels;
          return (
            <circle
              key={`level-${i}`}
              cx={center}
              cy={center}
              r={levelRadius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill axes */}
        {skills.map((skill, index) => {
          const angle = angleSlice * index - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={`axis-${index}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(128, 82, 255, 0.2)"
          stroke="#8052ff"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Skill labels */}
        {skills.map((skill, index) => {
          const angle = angleSlice * index - Math.PI / 2;
          const labelRadius = radius + 40;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Skill Category Grid Component
 */
export const SkillCategoryGrid = ({ categories = [] }) => {
  const categoryColorMap = {
    frontend: '#00f0ff',
    backend: '#8052ff',
    tools: '#00ff9d',
    other: '#ffb829',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, idx) => (
        <motion.div
          key={idx}
          className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 20px ${categoryColorMap[category.id] || '#8052ff'}60`,
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3
                className="text-lg font-bold"
                style={{ color: categoryColorMap[category.id] || '#8052ff' }}
              >
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skillIdx}
                  className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-lg bg-white/10 border border-white/20"
                  style={{ borderColor: categoryColorMap[category.id] || '#8052ff' }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    delay: skillIdx * 0.05,
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Animated Tech Stack Component
 */
export const TechStackShowcase = ({ technologies = [] }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {technologies.map((tech, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center gap-3 p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: idx * 0.05,
              duration: 0.5,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 20px rgba(128, 82, 255, 0.4)',
            }}
          >
            <div className="text-3xl">{tech.icon}</div>
            <span className="text-xs font-semibold text-center text-gray-300">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default {
  SkillProficiency,
  SkillBar,
  SkillRadarChart,
  SkillCategoryGrid,
  TechStackShowcase,
};
