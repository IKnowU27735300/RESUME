import React, { useState, useEffect } from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { 
  FileText, 
  Bot, 
  Shield, 
  Terminal, 
  Globe, 
  Layout, 
  Mic, 
  UserCheck, 
  Presentation, 
  MessageSquare, 
  Users, 
  Calendar, 
  Lock, 
  ExternalLink 
} from 'lucide-react';

const projects = [
  {
    title: 'Resume',
    desc: 'An immersive 3D AI portfolio and resume builder showcasing technical expertise.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    link: 'https://github.com/IKnowU27735300/RESUME-main',
    icon: FileText,
    color: '#8052ff'
  },
  {
    title: 'AI Partner',
    desc: 'An AI-driven companion for smart interactions and task assistance.',
    tech: ['AI/ML', 'Python', 'NLP'],
    link: 'https://github.com/IKnowU27735300/AI_Partner',
    icon: Bot,
    color: '#ffb829',
    isPrivate: true
  },
  {
    title: 'Repo Block',
    desc: 'A security-focused project for managing and blocking unauthorized repository access.',
    tech: ['Security', 'Node.js', 'GitHub API'],
    link: '#',
    icon: Shield,
    color: '#15846e',
    isPrivate: true
  },
  {
    title: 'Dev-AI',
    desc: 'An AI assistant specifically designed for developers to enhance productivity.',
    tech: ['LLMs', 'VS Code Plugin', 'JavaScript'],
    link: '#',
    icon: Terminal,
    color: '#9a9a9a',
    isPrivate: true
  },
  {
    title: 'MediWeb',
    desc: 'A comprehensive medical web platform for patient management and records.',
    tech: ['Full Stack', 'Healthcare Tech', 'React'],
    link: '#',
    icon: Globe,
    color: '#8052ff'
  },
  {
    title: 'Desktop-AI',
    desc: 'A desktop integration of AI models for local task automation.',
    tech: ['Electron', 'Python', 'Automation'],
    link: '#',
    icon: Layout,
    color: '#ffb829',
    isPrivate: true
  },
  {
    title: 'Kannada Voice Chat-bot',
    desc: 'A specialized voice-enabled chatbot supporting the Kannada language.',
    tech: ['Speech-to-Text', 'NLP', 'Kannada'],
    link: '#',
    icon: Mic,
    color: '#15846e'
  },
  {
    title: 'Sentinel-AI',
    desc: 'Advanced AI monitoring and security system for real-time threat detection.',
    tech: ['Computer Vision', 'Security', 'AI'],
    link: '#',
    icon: UserCheck,
    color: '#9a9a9a'
  },
  {
    title: 'SlidesGen.ai',
    desc: 'AI-powered presentation generator that creates slides from text descriptions.',
    tech: ['Generative AI', 'API', 'Web'],
    link: '#',
    icon: Presentation,
    color: '#8052ff'
  },
  {
    title: 'Vvencer Website',
    desc: 'Official website for Vvencer, featuring modern design and transitions.',
    tech: ['Frontend', 'UI/UX', 'Animation'],
    link: '#',
    icon: MessageSquare,
    color: '#ffb829'
  },
  {
    title: 'Seniors Farewell',
    desc: 'A commemorative platform designed for university senior farewell events.',
    tech: ['Event Tech', 'React', 'Gallery'],
    link: '#',
    icon: Users,
    color: '#15846e'
  },
  {
    title: 'Event Vista',
    desc: 'Event management platform deployed for professional hackathons and gatherings.',
    tech: ['Full Stack', 'Database', 'Scaling'],
    link: 'https://github.com/IKnowU27735300/Event-Vista',
    icon: Calendar,
    color: '#8052ff'
  }
];

export default function Projects() {
  const baseX = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? 280 : 320;
  const gap = isMobile ? 24 : 32;
  const itemWidth = cardWidth + gap;
  const totalInternalWidth = projects.length * itemWidth;

  const tripleProjects = [...projects, ...projects, ...projects];

  useAnimationFrame((t, delta) => {
    if (!isPaused && !isDragging) {
      let moveBy = -40 * (delta / 1000); 
      baseX.set(baseX.get() + moveBy);
    }

    if (baseX.get() <= -totalInternalWidth) {
      baseX.set(baseX.get() + totalInternalWidth);
    } else if (baseX.get() > 0) {
      baseX.set(baseX.get() - totalInternalWidth);
    }
  });

  const x = useSpring(baseX, {
    stiffness: 400,
    damping: 90,
  });

  return (
    <div className="w-full flex-grow flex flex-col items-center py-16 md:py-24 overflow-hidden select-none">
      <div className="text-center mb-16 space-y-4 px-4 overflow-visible w-full h-24">
        <ParticleHeader 
          text="My Projects" 
          subtext="No Fills, No Shadows / Drag to Explore"
        />
      </div>
      
      <div 
        className="relative w-full flex overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          drag="x"
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            baseX.set(x.get());
          }}
          className="flex py-10"
          style={{ gap: `${gap}px`, x, width: 'max-content' }}
        >
          {tripleProjects.map((proj, idx) => (
            <motion.a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="relative flex-shrink-0 rounded-2xl overflow-visible group/card border border-neutral-800 hover:border-[#8052ff] bg-transparent transition-all duration-500"
              style={{ width: `${cardWidth}px`, height: isMobile ? '400px' : '480px' }}
              draggable="false"
              whileHover={{ y: -15, scale: 1.01 }}
            >
              {/* Floating Keycaps emerging on hover */}
              <div className="absolute -top-3 -left-3 opacity-0 scale-75 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300 bg-black border border-[#8052ff] text-[#8052ff] font-mono text-[9px] px-2 py-0.5 rounded pointer-events-none">
                Esc
              </div>
              <div className="absolute -top-3 -right-3 opacity-0 scale-75 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300 bg-black border border-[#8052ff] text-[#8052ff] font-mono text-[9px] px-2 py-0.5 rounded pointer-events-none">
                {"{}"}
              </div>
              <div className="absolute -bottom-3 -left-3 opacity-0 scale-75 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300 bg-black border border-[#8052ff] text-[#8052ff] font-mono text-[9px] px-2 py-0.5 rounded pointer-events-none">
                Ctrl
              </div>
              <div className="absolute -bottom-3 -right-3 opacity-0 scale-75 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-300 bg-black border border-[#8052ff] text-[#8052ff] font-mono text-[9px] px-2 py-0.5 rounded pointer-events-none">
                {"<>"}
              </div>

              <div className="absolute inset-0 flex flex-col p-8 z-10 pointer-events-none">
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl border border-neutral-800 flex items-center justify-center mb-auto group-hover/card:border-[#8052ff] transition-colors duration-500"
                  style={{ color: proj.color }}
                >
                  <proj.icon className="w-8 h-8 md:w-9 md:h-9" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-display font-light text-white leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed line-clamp-2">
                    {proj.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 text-[9px] font-mono font-bold rounded-lg border border-neutral-800 text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6">
                    <div className="w-full py-3.5 border border-neutral-800 rounded-xl group-hover/card:border-[#8052ff] group-hover/card:text-[#8052ff] transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-white">
                      {proj.isPrivate ? (
                        <>Private <Lock className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Explore <ExternalLink className="w-3.5 h-3.5" /></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-20 flex justify-center px-4 w-full animate-none"
      >
        <a 
          href="https://github.com/IKnowU27735300"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-sm py-5 border border-neutral-800 rounded-xl font-display font-semibold text-base text-white hover:text-accentPrimary hover:border-accentPrimary transition-all duration-300 flex items-center justify-center gap-4 overflow-hidden"
        >
          <Terminal className="w-5 h-5 text-gray-500 group-hover:text-accentPrimary transition-colors" />
          More on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
