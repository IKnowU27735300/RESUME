import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// We will import our Page components here next
import GlobalNav from './components/GlobalNav';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import LoadingPage from './components/LoadingPage';
import MeshBackground from './components/MeshBackground';

const pages = ['Home', 'Experience', 'Education', 'Skills', 'Projects', 'Achievements', 'Contact'];

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer to track active section while scrolling
  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in upper middle
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePage(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="min-h-screen relative w-full bg-[#E5E7EB] scroll-smooth selection:bg-black selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200]"
          >
            <LoadingPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated glowing orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-amber-300/30 rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-yellow-400/20 rounded-full blur-[150px] animate-glow-delayed" />
        <div className="absolute top-[30%] left-[60%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-orange-300/20 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '5s' }} />
        
        {/* Animated glowing mesh grid (canvas) */}
        <MeshBackground />

        {/* Light beam 1 — warm gold, sweeps top-left → bottom-right */}
        <div
          className="mesh-light absolute inset-0"
          style={{
            background: 'linear-gradient(125deg, transparent 20%, rgba(212,175,55,0.18) 45%, rgba(255,230,80,0.28) 50%, rgba(212,175,55,0.18) 55%, transparent 80%)',
            filter: 'blur(40px)',
            willChange: 'transform',
            transformOrigin: 'center center',
          }}
        />

        {/* Light beam 2 — cool blue-white, sweeps top-right → bottom-left */}
        <div
          className="mesh-light-reverse absolute inset-0"
          style={{
            background: 'linear-gradient(55deg, transparent 20%, rgba(180,210,255,0.12) 45%, rgba(210,230,255,0.22) 50%, rgba(180,210,255,0.12) 55%, transparent 80%)',
            filter: 'blur(50px)',
            willChange: 'transform',
            transformOrigin: 'center center',
          }}
        />
      </div>

      <GlobalNav activePage={activePage} setActivePage={setActivePage} />

      <main className="w-full relative z-10 mx-auto overflow-x-hidden">
        <section id="Home" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center">
           <Home />
        </section>

        <section id="Experience" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-2">
           <Experience />
        </section>

        <section id="Education" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-2">
           <Education />
        </section>

        <section id="Skills" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-2">
           <Skills />
        </section>

        <section id="Projects" className="w-full px-0 py-2 flex flex-col items-center justify-center">
           <Projects />
        </section>

        <section id="Achievements" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-2">
           <Achievements />
        </section>

        <section id="Contact" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-2">
           <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
