import React from 'react';
import { motion } from 'framer-motion';

/**
 * COMPONENT SHOWCASE
 * This file demonstrates all the new enhanced components
 * Use this as a reference for how to use each component
 */

// ============================================
// 1. ANIMATION UTILITIES SHOWCASE
// ============================================
export const AnimationUtilitiesDemo = () => {
  import { 
    containerVariants, 
    itemVariants, 
    GradientText, 
    NeonText 
  } from '@/components/AnimationUtils';

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">
        <GradientText>Animation Utilities</GradientText>
      </h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="p-4 bg-white/5 rounded-lg">
          <NeonText color="cyan">Animated Item 1</NeonText>
        </motion.div>
        <motion.div variants={itemVariants} className="p-4 bg-white/5 rounded-lg">
          <NeonText color="magenta">Animated Item 2</NeonText>
        </motion.div>
        <motion.div variants={itemVariants} className="p-4 bg-white/5 rounded-lg">
          <NeonText color="lime">Animated Item 3</NeonText>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// 2. ENHANCED CARDS SHOWCASE
// ============================================
export const EnhancedCardsDemo = () => {
  import { 
    EnhancedCard, 
    GlassCard, 
    NeonCard 
  } from '@/components/EnhancedCards';

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">Enhanced Cards</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EnhancedCard glowColor="#00f0ff">
          <h3 className="text-xl font-bold mb-2">Cyan Glow Card</h3>
          <p className="text-gray-400">Hover to see the glow effect</p>
        </EnhancedCard>

        <NeonCard neonColor="magenta">
          <h3 className="text-xl font-bold mb-2">Magenta Neon</h3>
          <p className="text-gray-400">Bold neon styling</p>
        </NeonCard>

        <GlassCard intensity="heavy">
          <h3 className="text-xl font-bold mb-2">Glass Effect</h3>
          <p className="text-gray-400">Heavy glass morphism</p>
        </GlassCard>
      </div>
    </section>
  );
};

// ============================================
// 3. SKILL VISUALIZATIONS SHOWCASE
// ============================================
export const SkillVisualizationsDemo = () => {
  import { SkillProficiency, TechStackShowcase } from '@/components/SkillVisualizations';

  const skills = [
    { name: 'React', proficiency: 90, icon: '⚛️', color: '#61dafb' },
    { name: 'Python', proficiency: 85, icon: '🐍', color: '#3776ab' },
    { name: 'JavaScript', proficiency: 92, icon: '📜', color: '#f7df1e' },
  ];

  const techs = [
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'JavaScript', icon: '📜' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'GraphQL', icon: '⚙️' },
  ];

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">Skill Visualizations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {skills.map((skill) => (
          <SkillProficiency
            key={skill.name}
            name={skill.name}
            proficiency={skill.proficiency}
            icon={skill.icon}
            color={skill.color}
          />
        ))}
      </div>

      <h3 className="text-2xl font-bold mb-4">Tech Stack</h3>
      <TechStackShowcase technologies={techs} />
    </section>
  );
};

// ============================================
// 4. TIMELINE SHOWCASE
// ============================================
export const TimelineDemo = () => {
  import { InteractiveTimeline } from '@/components/InteractiveTimeline';

  const experiences = [
    {
      id: 1,
      title: 'Senior Developer',
      organization: 'Tech Company',
      date: 'Jan 2023 - Present',
      icon: '🚀',
      description: 'Leading frontend development and team mentorship',
      details: {
        skills: [
          'React Architecture',
          'Team Leadership',
          'Performance Optimization',
        ],
        technologies: ['React', 'TypeScript', 'GraphQL', 'Tailwind'],
        info: 'Led team of 5 developers in redesigning company dashboard',
      },
    },
    {
      id: 2,
      title: 'Junior Developer',
      organization: 'Startup Inc',
      date: 'Jun 2021 - Dec 2022',
      icon: '💻',
      description: 'Full-stack development on web applications',
      details: {
        skills: [
          'Full-stack Development',
          'API Integration',
          'Database Design',
        ],
        technologies: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
      },
    },
  ];

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">Interactive Timeline</h2>
      <InteractiveTimeline items={experiences} />
    </section>
  );
};

// ============================================
// 5. SCROLL ANIMATIONS SHOWCASE
// ============================================
export const ScrollAnimationsDemo = () => {
  import { 
    InViewAnimation, 
    slideInLeftVariants,
    slideInRightVariants 
  } from '@/components/ScrollAnimations';

  return (
    <section className="py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">Scroll Animations</h2>
      
      <div className="space-y-12">
        <InViewAnimation variants={slideInLeftVariants}>
          <div className="p-8 bg-white/5 rounded-lg">
            <h3 className="text-2xl font-bold">Slide in from left</h3>
            <p className="text-gray-400">This animates when it comes into view</p>
          </div>
        </InViewAnimation>

        <InViewAnimation variants={slideInRightVariants}>
          <div className="p-8 bg-white/5 rounded-lg">
            <h3 className="text-2xl font-bold">Slide in from right</h3>
            <p className="text-gray-400">Another scroll-triggered animation</p>
          </div>
        </InViewAnimation>
      </div>
    </section>
  );
};

// ============================================
// 6. COMPLETE SHOWCASE PAGE
// ============================================
export const ComponentShowcasePage = () => {
  return (
    <div className="w-full bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-8 text-center">
        <h1 className="text-6xl font-bold mb-4">
          <span className="gradient-text-hero">Component Showcase</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore all the enhanced components and animations available in your resume
        </p>
      </section>

      {/* Components */}
      <AnimationUtilitiesDemo />
      <EnhancedCardsDemo />
      <SkillVisualizationsDemo />
      <TimelineDemo />
      <ScrollAnimationsDemo />

      {/* Footer */}
      <section className="py-20 px-8 text-center border-t border-white/10">
        <p className="text-gray-400 mb-4">
          Check INTEGRATION_GUIDE.md for detailed documentation
        </p>
        <p className="text-sm text-gray-500">
          All components are production-ready and fully responsive
        </p>
      </section>
    </div>
  );
};

export default ComponentShowcasePage;

/*
 * QUICK COPY-PASTE TEMPLATES
 * Use these as starting points for your pages
 */

// ============================================
// TEMPLATE: Skills Page
// ============================================
export const SkillsPageTemplate = () => {
  import { SkillCategoryGrid, TechStackShowcase } from '@/components/SkillVisualizations';
  import { containerVariants, itemVariants } from '@/components/AnimationUtils';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="space-y-12"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-4xl font-bold mb-4">Skills</h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SkillCategoryGrid categories={/* your categories */} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TechStackShowcase technologies={/* your techs */} />
      </motion.div>
    </motion.div>
  );
};

// ============================================
// TEMPLATE: Experience Page
// ============================================
export const ExperiencePageTemplate = () => {
  import { InteractiveTimeline } from '@/components/InteractiveTimeline';

  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-bold">Experience</h2>
      <InteractiveTimeline items={/* your experiences */} />
    </div>
  );
};

// ============================================
// TEMPLATE: Project Cards
// ============================================
export const ProjectsPageTemplate = () => {
  import { EnhancedCard } from '@/components/EnhancedCards';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* your projects */}
      <EnhancedCard glowColor="#00f0ff">
        <h3 className="text-xl font-bold">Project Name</h3>
        <p className="text-gray-400">Description</p>
      </EnhancedCard>
    </div>
  );
};
