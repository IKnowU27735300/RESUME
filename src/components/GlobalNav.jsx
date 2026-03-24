import React from 'react';
import { motion } from 'framer-motion';

const pages = [
  'Home', 'Experience', 'Education', 'Skills', 'Projects', 'Achievements', 'Contact'
];

export default function GlobalNav({ activePage, setActivePage }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 lg:px-16 xl:px-24 py-4 pointer-events-none">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between pointer-events-auto">
        
        <div className="text-xl font-display font-bold tracking-tighter cursor-pointer" onClick={() => setActivePage('Home')}>
          Anish.<span className="text-accentPrimary">AI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 glass px-2 py-2 rounded-full shadow-lg">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activePage === p ? 'text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activePage === p && (
                <motion.div
                  layoutId="nav-bubble"
                  className="absolute inset-0 bg-accentPrimary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {p}
            </button>
          ))}
        </div>

        {/* Mobile Nav (simplified logic for now) */}
        <div className="md:hidden glass px-4 py-2 rounded-full flex gap-2 overflow-x-auto w-[65vw] max-w-[300px] snap-x">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className={`snap-center shrink-0 px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activePage === p ? 'bg-accentPrimary text-black' : 'text-gray-400'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}
