import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VIDEO_SIZE = 320;

export default function LoadingPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[#E5E7EB] flex flex-col items-center justify-center overflow-hidden">

      {/* Subtle scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-30 z-0 pointer-events-none" />

      {/* All rings + glitch + video in ONE relative container */}
      <div className="relative flex items-center justify-center z-10" style={{ width: VIDEO_SIZE, height: VIDEO_SIZE }}>

        {/* ── Pulsing outer halos ───────────────────────────── */}
        <motion.div
          className="absolute rounded-full border border-black/10"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: VIDEO_SIZE + 140, height: VIDEO_SIZE + 140 }}
        />
        <motion.div
          className="absolute rounded-full border border-black/15"
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{ width: VIDEO_SIZE + 80, height: VIDEO_SIZE + 80 }}
        />

        {/* ── Spinning arcs ─────────────────────────────────── */}
        <motion.div
          className="absolute rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: VIDEO_SIZE + 40, height: VIDEO_SIZE + 40,
            border: '2px solid transparent',
            borderTopColor: 'rgba(0,0,0,0.25)',
            borderRightColor: 'rgba(0,0,0,0.08)',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            width: VIDEO_SIZE + 16, height: VIDEO_SIZE + 16,
            border: '1.5px solid transparent',
            borderBottomColor: 'rgba(0,0,0,0.18)',
            borderLeftColor: 'rgba(0,0,0,0.07)',
          }}
        />

        {/* ── RGB chromatic split ring ───────────────────────── */}
        <div
          className="boot-rgb-ring absolute rounded-full pointer-events-none"
          style={{ width: VIDEO_SIZE + 6, height: VIDEO_SIZE + 6, borderRadius: '50%' }}
        />

        {/* ── Chromatic glitch border on the video circle ───── */}
        <div
          className="boot-glitch-border absolute rounded-full pointer-events-none"
          style={{
            width: VIDEO_SIZE + 4,
            height: VIDEO_SIZE + 4,
            border: '2.5px solid',
            borderRadius: '50%',
          }}
        />

        {/* ── Glitch slice bars (horizontal fragments) ────────── */}
        {/* Top-quarter slice */}
        <div
          className="boot-slice-1 absolute pointer-events-none overflow-hidden"
          style={{
            width: VIDEO_SIZE, height: 14,
            top: '22%', left: 0,
            background: 'linear-gradient(90deg, transparent 10%, rgba(255,30,60,0.55) 40%, rgba(0,240,200,0.45) 60%, transparent 90%)',
            filter: 'blur(1px)',
            borderRadius: '2px',
          }}
        />
        {/* Middle slice */}
        <div
          className="boot-slice-2 absolute pointer-events-none"
          style={{
            width: VIDEO_SIZE, height: 8,
            top: '50%', left: 0,
            background: 'linear-gradient(90deg, transparent 5%, rgba(180,0,255,0.6) 35%, rgba(255,200,0,0.5) 65%, transparent 95%)',
            filter: 'blur(1.5px)',
          }}
        />
        {/* Bottom-quarter slice */}
        <div
          className="boot-slice-3 absolute pointer-events-none"
          style={{
            width: VIDEO_SIZE, height: 10,
            top: '75%', left: 0,
            background: 'linear-gradient(90deg, transparent 15%, rgba(0,200,255,0.55) 45%, rgba(255,30,60,0.45) 70%, transparent 90%)',
            filter: 'blur(1px)',
          }}
        />

        {/* ── Static noise flicker overlay on video ─────────── */}
        <div
          className="boot-noise-flicker absolute rounded-full pointer-events-none z-20"
          style={{
            width: VIDEO_SIZE, height: VIDEO_SIZE,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            borderRadius: '50%',
            mixBlendMode: 'overlay',
          }}
        />

        {/* ── Video circle ──────────────────────────────────── */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: VIDEO_SIZE, height: VIDEO_SIZE,
            boxShadow: '0 0 50px 6px rgba(0,0,0,0.12), 0 0 100px 16px rgba(0,0,0,0.06)',
          }}
        >
          <video
            ref={videoRef}
            src="/boot.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Boot label */}
      <motion.p
        className="mt-10 text-[11px] font-mono font-bold text-gray-400 uppercase tracking-[0.45em] z-10"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Booting System...
      </motion.p>

    </div>
  );
}
