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
  const lastScrollTime = React.useRef(0);
  const touchStartY = React.useRef(null);
  const scrollCooldown = 1200; // ms

  useEffect(() => {
    // Standard artificial delay for a premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const handleScroll = (delta) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;

      const currentIndex = pages.indexOf(activePage);

      if (delta > 30 && currentIndex < pages.length - 1) {
        lastScrollTime.current = now;
        setActivePage(pages[currentIndex + 1]);
      } else if (delta < -30 && currentIndex > 0) {
        lastScrollTime.current = now;
        setActivePage(pages[currentIndex - 1]);
      }
    };

    const onWheel = (e) => handleScroll(e.deltaY);
    
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      handleScroll(delta);
      touchStartY.current = null;
    };

    window.addEventListener('wheel', onWheel);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [loading, activePage]);

  const renderPage = () => {
    if (loading) return null; // We use the LoadingPage component overlay directly
    switch (activePage) {
      case 'Home': return <Home />;
      case 'Experience': return <Experience />;
      case 'Education': return <Education />;
      case 'Skills': return <Skills />;
      case 'Projects': return <Projects />;
      case 'Achievements': return <Achievements />;
      case 'Contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden flex flex-col items-center justify-center">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background graphic */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accentSecondary/10 via-[#050505] to-[#050505]"></div>

      <GlobalNav activePage={activePage} setActivePage={setActivePage} />

      <main className={`w-full flex-grow flex flex-col items-start justify-center pt-24 pb-12 relative z-10 mx-auto min-h-screen ${activePage === 'Projects' ? 'px-0 max-w-none' : 'px-4 lg:px-16 xl:px-24 max-w-[1920px]'}`}>
        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full flex flex-col items-start justify-center h-full ${activePage === 'Projects' ? 'items-center' : ''}`}
            >
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
