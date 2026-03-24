import React from 'react';
import { 
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
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
  // ... (projects array remains the same)
  {
    title: 'Resume',
    desc: 'An immersive 3D AI portfolio and resume builder showcasing technical expertise.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    link: 'https://github.com/IKnowU27735300/RESUME-main',
    icon: FileText,
    color: '#D4AF37'
  },
  {
    title: 'AI Partner',
    desc: 'An AI-driven companion for smart interactions and task assistance.',
    tech: ['AI/ML', 'Python', 'NLP'],
    link: 'https://github.com/IKnowU27735300/AI_Partner',
    icon: Bot,
    color: '#C5A021',
    isPrivate: true
  },
  {
    title: 'Repo Block',
    desc: 'A security-focused project for managing and blocking unauthorized repository access.',
    tech: ['Security', 'Node.js', 'GitHub API'],
    link: '#',
    icon: Shield,
    color: '#E6BE8A',
    isPrivate: true
  },
  {
    title: 'Dev-AI',
    desc: 'An AI assistant specifically designed for developers to enhance productivity.',
    tech: ['LLMs', 'VS Code Plugin', 'JavaScript'],
    link: '#',
    icon: Terminal,
    color: '#8B7226',
    isPrivate: true
  },
  {
    title: 'MediWeb',
    desc: 'A comprehensive medical web platform for patient management and records.',
    tech: ['Full Stack', 'Healthcare Tech', 'React'],
    link: '#',
    icon: Globe,
    color: '#D4AF37'
  },
  {
    title: 'Desktop-AI',
    desc: 'A desktop integration of AI models for local task automation.',
    tech: ['Electron', 'Python', 'Automation'],
    link: '#',
    icon: Layout,
    color: '#C5A021',
    isPrivate: true
  },
  {
    title: 'Kannada Voice Chat-bot',
    desc: 'A specialized voice-enabled chatbot supporting the Kannada language.',
    tech: ['Speech-to-Text', 'NLP', 'Kannada'],
    link: '#',
    icon: Mic,
    color: '#E6BE8A'
  },
  {
    title: 'Sentinel-AI',
    desc: 'Advanced AI monitoring and security system for real-time threat detection.',
    tech: ['Computer Vision', 'Security', 'AI'],
    link: '#',
    icon: UserCheck,
    color: '#8B7226'
  },
  {
    title: 'SlidesGen.ai',
    desc: 'AI-powered presentation generator that creates slides from text descriptions.',
    tech: ['Generative AI', 'API', 'Web'],
    link: '#',
    icon: Presentation,
    color: '#D4AF37'
  },
  {
    title: 'Vvencer Website',
    desc: 'Official website for Vvencer, featuring modern design and transitions.',
    tech: ['Frontend', 'UI/UX', 'Animation'],
    link: '#',
    icon: MessageSquare,
    color: '#C5A021'
  },
  {
    title: 'Seniors Farewell',
    desc: 'A commemorative platform designed for university senior farewell events.',
    tech: ['Event Tech', 'React', 'Gallery'],
    link: '#',
    icon: Users,
    color: '#E6BE8A'
  },
  {
    title: 'Event Vista',
    desc: 'Event management platform deployed for professional hackathons and gatherings.',
    tech: ['Full Stack', 'Database', 'Scaling'],
    link: 'https://github.com/IKnowU27735300/Event-Vista',
    icon: Calendar,
    color: '#8B7226'
  }
];

export default function Projects() {
  const baseX = useMotionValue(0);
  const scrollRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? 280 : 320;
  const gap = isMobile ? 24 : 32;
  const itemWidth = cardWidth + gap;
  const totalInternalWidth = projects.length * itemWidth;

  // Triple the projects for seamless infinite scroll
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
      <div className="text-center mb-16 space-y-4 px-4 overflow-visible">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-decorative font-bold tracking-tight uppercase">
          My <span className="text-gradient">Creations</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Interactive Portfolio <span className="mx-2">/</span> Drag to Explore
        </p>
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
              className="relative flex-shrink-0 rounded-[2.5rem] overflow-hidden group/card shadow-2xl border border-white/5 transition-all duration-500"
              style={{ width: `${cardWidth}px`, height: isMobile ? '400px' : '480px' }}
              draggable="false"
              whileHover={{ y: -15, scale: 1.02 }}
            >
              {/* Card Aura */}
              <div 
                className="absolute inset-0 opacity-20 group-hover/card:opacity-40 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 0%, ${proj.color}, transparent 70%)` }}
              />
              <div className="absolute inset-0 backdrop-blur-3xl bg-white/[0.02]" />
               
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0" />

              <div className="absolute inset-0 flex flex-col p-8 z-10 pointer-events-none">
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-auto shadow-2xl group-hover/card:scale-110 transition-transform duration-500"
                  style={{ color: proj.color }}
                >
                  <proj.icon className="w-8 h-8 md:w-9 md:h-9" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed line-clamp-2">
                    {proj.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 text-[9px] font-mono font-bold rounded-lg bg-white/5 border border-white/5 text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6">
                    <div className="w-full py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl group-hover/card:bg-white group-hover/card:text-black transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
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
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-darkBg via-darkBg/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-darkBg via-darkBg/50 to-transparent z-20 pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-20 flex justify-center px-4 w-full"
      >
        <a 
          href="https://github.com/IKnowU27735300"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-sm py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl font-display font-black text-base text-white hover:text-black hover:bg-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentTertiary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <Terminal className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
          More on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
