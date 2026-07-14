import React, { useState, useEffect, useRef } from 'react';

export default function LazyCanvas({ children, className = '', height = '100%', fallback = null }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '300px 0px', // Pre-render 300px before scrolling into view
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ height, width: '100%', position: 'relative' }}>
      <div style={{ display: isIntersecting ? 'block' : 'none', width: '100%', height: '100%' }}>
        {children}
      </div>
      {!isIntersecting && fallback}
    </div>
  );
}
