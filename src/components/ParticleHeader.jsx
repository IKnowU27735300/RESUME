import React from 'react';

const ParticleHeader = ({ text, className = "", subtext = "", align = 'center', fontFamily = '"Cinzel Decorative", cursive' }) => {
  const flexAlignClass = align === 'center' 
    ? 'items-center text-center' 
    : (align === 'right' ? 'items-end text-right' : 'items-start text-left');

  return (
    <div className={`relative w-full h-full flex flex-col justify-center ${flexAlignClass} ${className}`}>
      <h2 
        className="text-gray-900 font-black tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-tight select-none" 
        style={{ fontFamily, wordSpacing: '0.5em' }}
      >
        {text}
      </h2>
      {subtext && (
        <p className="mt-2 text-gray-600 font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] select-none">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default ParticleHeader;
