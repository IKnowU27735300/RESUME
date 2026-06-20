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
    <div className="min-h-screen relative w-full bg-white scroll-smooth selection:bg-black selection:text-white overflow-x-hidden">
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

      {/* Background fixed graphic with increased intensity and pulsed breathing effect */}
      <GlobalNav activePage={activePage} setActivePage={setActivePage} />

      <main className="w-full relative z-10 mx-auto overflow-x-hidden">
        <section id="Home" className="min-h-screen w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center">
           <Home />
        </section>

        <section id="Experience" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-12">
           <Experience />
        </section>

        <section id="Education" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-12">
           <Education />
        </section>

        <section id="Skills" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-12">
           <Skills />
        </section>

        <section id="Projects" className="w-full px-0 py-12 flex flex-col items-center justify-center">
           <Projects />
        </section>

        <section id="Achievements" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-12">
           <Achievements />
        </section>

        <section id="Contact" className="w-full px-4 lg:px-16 xl:px-24 flex items-center justify-center py-12">
           <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
