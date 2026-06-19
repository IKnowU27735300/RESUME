import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// We will import our Page components here next
import GlobalNav from './components/GlobalNav';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import LoadingPage from './components/LoadingPage';
import CursorEffects from './components/CursorEffects';
import { OrbBackground } from './components/EnhancedBackground';
import { ScrollProgressIndicator, SectionScrollIndicator } from './components/ScrollAnimations';

const pages = ['Home', 'About', 'Experience', 'Education', 'Skills', 'Projects', 'Achievements', 'Contact'];

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
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
    <div className="min-h-screen relative w-full bg-[#000000] scroll-smooth selection:bg-accentPrimary/30 overflow-x-hidden">
      {/* Enhanced Background */}
      <OrbBackground />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Section Scroll Indicator */}
      <SectionScrollIndicator sections={pages} />

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

      {/* Cursor Effects Overlay */}
      <CursorEffects />

      <GlobalNav activePage={activePage} setActivePage={setActivePage} />

      <main className="w-full relative z-10 mx-auto overflow-x-hidden">
        <section id="Home" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center">
           <Home />
        </section>

        <section id="About" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-20">
           <About />
        </section>

        <section id="Experience" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-20">
           <Experience />
        </section>

        <section id="Education" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-20">
           <Education />
        </section>

        <section id="Skills" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-20">
           <Skills />
        </section>

        <section id="Projects" className="min-h-screen w-full px-0 py-20 flex flex-col items-center justify-center">
           <Projects />
        </section>

        <section id="Achievements" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-20">
           <Achievements />
        </section>

        <section id="Contact" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-20">
           <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
