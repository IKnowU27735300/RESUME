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
    color: '#00f0ff'
  },
  {
    title: 'AI Partner',
    desc: 'An AI-driven companion for smart interactions and task assistance.',
    tech: ['AI/ML', 'Python', 'NLP'],
    link: 'https://github.com/IKnowU27735300/AI_Partner',
    icon: Bot,
    color: '#bc13fe',
    isPrivate: true
  },
  {
    title: 'Repo Block',
    desc: 'A security-focused project for managing and blocking unauthorized repository access.',
    tech: ['Security', 'Node.js', 'GitHub API'],
    link: '#',
    icon: Shield,
    color: '#ff0055',
    isPrivate: true
  },
  {
    title: 'Dev-AI',
    desc: 'An AI assistant specifically designed for developers to enhance productivity.',
    tech: ['LLMs', 'VS Code Plugin', 'JavaScript'],
    link: '#',
    icon: Terminal,
    color: '#00ff9d',
    isPrivate: true
  },
  {
    title: 'MediWeb',
    desc: 'A comprehensive medical web platform for patient management and records.',
    tech: ['Full Stack', 'Healthcare Tech', 'React'],
    link: '#',
    icon: Globe,
    color: '#4d4dff'
  },
  {
    title: 'Desktop-AI',
    desc: 'A desktop integration of AI models for local task automation.',
    tech: ['Electron', 'Python', 'Automation'],
    link: '#',
    icon: Layout,
    color: '#ffaa00',
    isPrivate: true
  },
  {
    title: 'Kannada Voice Chat-bot',
    desc: 'A specialized voice-enabled chatbot supporting the Kannada language.',
    tech: ['Speech-to-Text', 'NLP', 'Kannada'],
    link: '#',
    icon: Mic,
    color: '#ff5500'
  },
  {
    title: 'Sentinel-AI',
    desc: 'Advanced AI monitoring and security system for real-time threat detection.',
    tech: ['Computer Vision', 'Security', 'AI'],
    link: '#',
    icon: UserCheck,
    color: '#00ccff'
  },
  {
    title: 'SlidesGen.ai',
    desc: 'AI-powered presentation generator that creates slides from text descriptions.',
    tech: ['Generative AI', 'API', 'Web'],
    link: '#',
    icon: Presentation,
    color: '#cc00ff'
  },
  {
    title: 'Vvencer Website',
    desc: 'Official website for Vvencer, featuring modern design and transitions.',
    tech: ['Frontend', 'UI/UX', 'Animation'],
    link: '#',
    icon: MessageSquare,
    color: '#ffcc00'
  },
  {
    title: 'Seniors Farewell',
    desc: 'A commemorative platform designed for university senior farewell events.',
    tech: ['Event Tech', 'React', 'Gallery'],
    link: '#',
    icon: Users,
    color: '#ff00aa'
  },
  {
    title: 'Event Vista',
    desc: 'Event management platform deployed for professional hackathons and gatherings.',
    tech: ['Full Stack', 'Database', 'Scaling'],
    link: 'https://github.com/IKnowU27735300/Event-Vista',
    icon: Calendar,
    color: '#00ffa2'
  }
];

export default function Projects() {
  const baseX = useMotionValue(0);
  const scrollRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  // Triple the projects to ensure infinity and smoothness during drag
  const tripleProjects = [...projects, ...projects, ...projects];
  
  // Card base width (320px) + Gap (32px)
  const itemWidth = 352; 
  const totalInternalWidth = projects.length * itemWidth;

  useAnimationFrame((t, delta) => {
    if (!isPaused && !isDragging) {
      // Linear speed in pixels per second
      let moveBy = -40 * (delta / 1000); 
      baseX.set(baseX.get() + moveBy);
    }

    // Infinite Loop Logic: If we scroll past the first set, reset to stay within bounds
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
    <div className="w-full flex flex-col items-center py-24 overflow-hidden select-none">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          My <span className="text-gradient hover:scale-110 transition-transform cursor-default inline-block">Creations</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
          Continuous Scroll • Drag to Navigate
        </p>
      </div>
      
      <div 
        className="relative w-full flex overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          style={{ x, width: 'max-content' }}
          drag="x"
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            // Sync the base value with the current spring-smoothed value to preserve exact position
            baseX.set(x.get());
          }}
          className="flex gap-8 py-10"
        >
          {tripleProjects.map((proj, idx) => (
            <motion.a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="relative flex-shrink-0 w-[300px] md:w-[320px] h-[450px] rounded-[40px] overflow-hidden group/card shadow-2xl border border-white/10 transition-shadow duration-500"
              draggable="false"
              whileHover={{ y: -10 }}
            >
              <div 
                className="absolute inset-0 opacity-40 group-hover/card:opacity-70 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${proj.color} 0%, transparent 80%)` }}
              />
              <div className="absolute inset-0 backdrop-blur-[30px] bg-white/5" />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-48 h-48 rounded-full blur-[60px] opacity-30 group-hover/card:opacity-50 transition-opacity duration-500"
                style={{ backgroundColor: proj.color }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center z-10 pointer-events-none">
                <div 
                  className="mb-auto mt-8 p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  style={{ color: proj.color }}
                >
                  <proj.icon className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2 drop-shadow-md">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-200/80 mb-6 font-sans leading-relaxed line-clamp-2 px-2">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {proj.tech.slice(0, 2).map((t, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/10 border border-white/10 text-white/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="w-full py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl group-hover/card:bg-white group-hover/card:text-black transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2">
                  {proj.isPrivate ? (
                    <>Private Project <Lock className="w-4 h-4" /></>
                  ) : (
                    <>View Project <ExternalLink className="w-4 h-4" /></>
                  )}
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </motion.a>
          ))}
        </motion.div>
        
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-darkBg to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-darkBg to-transparent z-20 pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 flex justify-center"
      >
        <a 
          href="https://github.com/IKnowU27735300"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-display font-black text-lg text-white hover:text-black hover:bg-white hover:scale-110 transition-all duration-500 shadow-2xl flex items-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#bc13fe] to-[#ff0055] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <Terminal className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
          View All Projects
          <ExternalLink className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform duration-500" />
        </a>
      </motion.div>
    </div>
  );
}
