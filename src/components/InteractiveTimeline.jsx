import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Interactive Timeline Component
 * Creates an elegant, expandable timeline for experiences or education
 */
export const InteractiveTimeline = ({ items = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="relative w-full">
      {/* Vertical line connector */}
      <motion.div
        className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-accentPrimary to-neon-lime"
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 1.5, delay: 0.2 }}
        viewport={{ once: true }}
      />

      {/* Timeline items */}
      <div className="space-y-8 pl-24">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute -left-20 top-2 w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-accentPrimary flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              {item.icon ? (
                <span className="text-xl">{item.icon}</span>
              ) : (
                <span className="text-white font-bold text-sm">{index + 1}</span>
              )}
            </motion.div>

            {/* Timeline card */}
            <motion.div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer transition-all"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(128, 82, 255, 0.3)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-neon-cyan font-semibold text-sm">{item.organization}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-neon-cyan" />
                </motion.div>
              </div>

              {/* Date badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-semibold mb-3"
                animate={{ scale: expandedId === item.id ? 1.05 : 1 }}
              >
                <span>📅</span>
                {item.date}
              </motion.div>

              {/* Preview/Description */}
              <p className="text-gray-300 text-sm mb-3">{item.description || item.preview}</p>

              {/* Expandable content */}
              <AnimatePresence>
                {expandedId === item.id && item.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10 space-y-3"
                  >
                    {/* Skills/Highlights */}
                    {item.details.skills && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Key Achievements</h4>
                        <ul className="space-y-1">
                          {item.details.skills.map((skill, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="text-sm text-gray-400 flex items-center gap-2"
                            >
                              <span className="text-neon-lime">▸</span>
                              {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {item.details.technologies && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.details.technologies.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.03 }}
                              className="px-3 py-1 rounded-full bg-accentPrimary/20 border border-accentPrimary/50 text-accentPrimary text-xs font-semibold"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional info */}
                    {item.details.info && (
                      <p className="text-sm text-gray-400 italic">{item.details.info}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
 * Vertical Timeline (Simpler version)
 */
export const VerticalTimeline = ({ items = [], orientation = 'left' }) => {
  const isLeft = orientation === 'left';

  return (
    <div className="relative w-full py-10">
      {/* Center line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accentPrimary via-neon-cyan to-neon-lime" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Content */}
            <motion.div
              className="w-1/2 pr-8"
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-neon-cyan text-sm font-semibold mb-2">{item.subtitle}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </motion.div>

            {/* Timeline dot */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-accentPrimary flex items-center justify-center z-10 relative"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon ? (
                <span className="text-xl">{item.icon}</span>
              ) : (
                <span className="text-white font-bold">{index + 1}</span>
              )}
            </motion.div>

            {/* Empty space */}
            <div className="w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
 * Horizontal Timeline
 */
export const HorizontalTimeline = ({ items = [] }) => {
  const [activeId, setActiveId] = useState(items[0]?.id || 0);

  return (
    <div className="w-full">
      {/* Timeline path */}
      <div className="relative h-2 bg-white/10 rounded-full mb-12 overflow-hidden">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-neon-cyan via-accentPrimary to-neon-lime rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        />

        {/* Timeline dots */}
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            className="absolute w-6 h-6 rounded-full bg-black border-2 border-white/30 -top-2 -translate-x-1/2 hover:border-neon-cyan transition-all"
            style={{ left: `${(index / (items.length - 1)) * 100}%` }}
            onClick={() => setActiveId(item.id)}
            whileHover={{ scale: 1.3, borderColor: '#00f0ff' }}
            animate={{
              borderColor: activeId === item.id ? '#8052ff' : 'rgba(255, 255, 255, 0.3)',
              scale: activeId === item.id ? 1.2 : 1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {items.map((item) => (
          activeId === item.id && (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 text-center"
            >
              {item.icon && <span className="text-4xl mb-3 block">{item.icon}</span>}
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-neon-cyan font-semibold mb-3">{item.subtitle}</p>
              <p className="text-gray-400 max-w-2xl mx-auto">{item.description}</p>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * Milestone Timeline
 */
export const MilestoneTimeline = ({ milestones = [] }) => {
  return (
    <div className="w-full space-y-8">
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
        >
          {/* Content */}
          <div className="flex-1">
            <motion.div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                {milestone.icon && <span className="text-2xl">{milestone.icon}</span>}
                <h3 className="text-lg font-bold text-white">{milestone.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">{milestone.description}</p>
            </motion.div>
          </div>

          {/* Timeline indicator */}
          <motion.div
            className="flex-shrink-0"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-accentPrimary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-black" />
            </div>
          </motion.div>

          {/* Empty space */}
          <div className="flex-1" />
        </motion.div>
      ))}
    </div>
  );
};

export default {
  InteractiveTimeline,
  VerticalTimeline,
  HorizontalTimeline,
  MilestoneTimeline,
};
