import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const pages = [
  'Home', 'About', 'Experience', 'Education', 'Skills', 'Projects', 'Achievements', 'Contact'
];

export default function GlobalNav({ activePage, setActivePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePageSelect = (p) => {
    const element = document.getElementById(p);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-12 lg:px-16 xl:px-24 py-6 pointer-events-none">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Logo */}
        <div 
          className="text-2xl font-display font-bold tracking-tighter cursor-pointer flex items-center gap-2" 
          onClick={() => handlePageSelect('Home')}
        >
          <div className="w-8 h-8 rounded-lg bg-accentPrimary flex items-center justify-center text-white font-black text-xs">AI</div>
          <span className="text-white">Port.<span className="text-accentPrimary">Folio</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 border border-neutral-800 bg-black/90 px-2 py-2 rounded-full">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handlePageSelect(p)}
              className={`relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                activePage === p ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activePage === p && (
                <motion.div
                  layoutId="nav-bubble"
                  className="absolute inset-0 bg-accentPrimary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {p}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden border border-neutral-800 bg-black w-12 h-12 rounded-full flex items-center justify-center text-white pointer-events-auto"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center p-8 md:hidden pointer-events-auto"
            >
              <div className="flex flex-col items-center gap-6 relative z-10 w-full">
                {pages.map((p, idx) => (
                  <motion.button
                    key={p}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                    onClick={() => handlePageSelect(p)}
                    className={`text-4xl font-display font-black tracking-tight transition-all ${
                      activePage === p ? 'text-accentPrimary scale-110' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {p}
                    {activePage === p && (
                      <motion.div 
                        layoutId="mobile-active-dot"
                        className="h-2 w-2 bg-accentPrimary rounded-full mx-auto mt-2"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 flex flex-col items-center gap-4 text-gray-500 font-mono text-xs uppercase tracking-widest"
              >
                <span>© 2026 Anish Inamadar</span>
                <div className="flex gap-4">
                  <div className="w-1 h-1 rounded-full bg-accentPrimary" />
                  <div className="w-1.5 h-1.5 rounded-full bg-accentSecondary" />
                  <div className="w-1 h-1 rounded-full bg-accentTertiary" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}
