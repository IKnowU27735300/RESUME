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

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Standard artificial delay for a premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accentSecondary/20 via-darkBg to-darkBg"></div>

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
