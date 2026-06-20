import React from 'react';
import ParticleHeader from '../components/ParticleHeader';
import { 
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate
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
    title: 'AI Partner',
    desc: 'An AI-driven companion for smart interactions and task assistance.',
    tech: ['AI/ML', 'Python', 'NLP'],
    link: 'https://github.com/IKnowU27735300/AI_Partner',
    icon: Bot,
    color: '#000000',
    isPrivate: true
  },
  {
    title: 'Repo Block',
    desc: 'A security-focused project for managing and blocking unauthorized repository access.',
    tech: ['Security', 'Node.js', 'GitHub API'],
    link: '#',
    icon: Shield,
    color: '#000000',
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
    link: 'https://github.com/IKnowU27735300/Hackthon-MediWEb',
    icon: Globe,
    color: '#000000'
  },
  {
    title: 'Desktop-AI',
    desc: 'A desktop integration of AI models for local task automation.',
    tech: ['Electron', 'Python', 'Automation'],
    link: '#',
    icon: Layout,
    color: '#000000',
    isPrivate: true
  },
  {
    title: 'Kannada Voice Chat-bot',
    desc: 'A specialized voice-enabled chatbot supporting the Kannada language.',
    tech: ['Speech-to-Text', 'NLP', 'Kannada'],
    link: 'https://github.com/IKnowU27735300/Kannada-Voice-Chatbot',
    icon: Mic,
    color: '#000000'
  },
  {
    title: 'Sentinel-AI',
    desc: 'Advanced AI monitoring and security system for real-time threat detection.',
    tech: ['Computer Vision', 'Security', 'AI'],
    link: 'https://github.com/IKnowU27735300/Sentinel_AI',
    icon: UserCheck,
    color: '#8B7226'
  },
  {
    title: 'SlidesGen.ai',
    desc: 'AI-powered presentation generator that creates slides from text descriptions.',
    tech: ['Generative AI', 'API', 'Web'],
    link: 'https://github.com/IKnowU27735300/SlideGen.AI',
    icon: Presentation,
    color: '#000000'
  },
  {
    title: 'Vencer Website',
    desc: 'Official website for Vvencer, featuring modern design and transitions.',
    tech: ['Frontend', 'UI/UX', 'Animation'],
    link: 'https://github.com/IKnowU27735300/Vencer_Website',
    icon: MessageSquare,
    color: '#000000'
  },
  {
    title: 'Seniors Farewell',
    desc: 'A commemorative platform designed for university senior farewell events.',
    tech: ['Event Tech', 'React', 'Gallery'],
    link: 'https://github.com/IKnowU27735300/Seniors_Farewell',
    icon: Users,
    color: '#000000'
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

function ProjectCard({ proj, cardWidth, isMobile }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={proj.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex-shrink-0 rounded-[2.5rem] overflow-hidden group/card shadow-xl hover:shadow-2xl border border-black/5 bg-white/60 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-4 hover:border-black/10 cursor-pointer"
      style={{ width: `${cardWidth}px`, height: isMobile ? '400px' : '480px' }}
      draggable="false"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight background */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover/card:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${proj.color === '#000000' ? 'rgba(0,0,0,0.06)' : proj.color + '25'},
              transparent 60%
            )
          `,
        }}
      />

      {/* Decorative gradient blob */}
      <div 
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-black/5 to-transparent rounded-bl-full -z-10 group-hover/card:scale-150 transition-transform duration-700 ease-out" 
        style={{ backgroundColor: proj.color === '#000000' ? 'transparent' : proj.color + '15' }}
      />

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#FDFBF7]/95 via-[#FDFBF7]/60 to-transparent z-0" />

      <div className="absolute inset-0 flex flex-col p-8 z-10 pointer-events-none">
        <div 
          className="w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] bg-white border border-black/5 flex items-center justify-center mb-auto shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] group-hover/card:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.2)] group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-500 ease-out"
          style={{ color: proj.color === '#000000' ? '#222' : proj.color }}
        >
          <proj.icon className="w-7 h-7 md:w-8 md:h-8 drop-shadow-sm" />
        </div>
        
        <div className="space-y-3 transform group-hover/card:-translate-y-2 transition-transform duration-500 ease-out">
          <h3 className="text-2xl md:text-3xl font-display font-black text-gray-900 leading-tight tracking-tight">
            {proj.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed line-clamp-2">
            {proj.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {proj.tech.slice(0, 3).map((t, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-full bg-black/5 text-gray-800 border border-black/5 backdrop-blur-sm shadow-sm uppercase"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="pt-6">
            <div className="w-full py-4 bg-gray-900 text-white rounded-xl shadow-lg shadow-black/20 group-hover/card:shadow-black/30 group-hover/card:bg-black transition-all duration-500 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">
                {proj.isPrivate ? (
                  <>Private <Lock className="w-4 h-4" /></>
                ) : (
                  <>Explore <ExternalLink className="w-4 h-4 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" /></>
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 ease-in-out" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

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
      <div className="text-center mb-16 space-y-4 px-4 overflow-visible w-full h-24">
        <ParticleHeader 
          text="My Creations" 
          subtext="Interactive Portfolio / Drag to Explore"
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
            <ProjectCard key={idx} proj={proj} cardWidth={cardWidth} isMobile={isMobile} />
          ))}
        </motion.div>
        
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/50 to-transparent z-20 pointer-events-none" />
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
          className="group relative w-full max-w-sm py-5 bg-white/60 backdrop-blur-3xl border border-black/10 rounded-2xl font-display font-black text-base text-gray-800 hover:text-white hover:bg-black transition-all duration-500 shadow-xl flex items-center justify-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentTertiary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <Terminal className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
          More on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
