import React, { useEffect, useRef } from 'react';

const CELL = 40; // must match the 40px grid size

export default function MeshBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animFrame;
    let startTime = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const t = (timestamp - startTime) / 1000; // elapsed seconds

      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;
      const maxDiag = cols + rows;

      ctx.clearRect(0, 0, W, H);

      // ── Base grid lines (faint) ────────────────────────────────────
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,0,0,0.055)';
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        ctx.moveTo(c * CELL, 0);
        ctx.lineTo(c * CELL, H);
      }
      for (let r = 0; r <= rows; r++) {
        ctx.moveTo(0, r * CELL);
        ctx.lineTo(W, r * CELL);
      }
      ctx.stroke();

      // ── Glowing wave — diagonal index = col + row ──────────────────
      // Wave travels across all diagonals in ~6s then loops
      const waveWidth  = 7;          // how many diagonal bands glow at once
      const waveSpeed  = maxDiag / 6; // diagonals per second
      const waveHead   = (t * waveSpeed) % maxDiag;

      // Secondary counter-wave (blue-white, slower)
      const wave2Width = 5;
      const wave2Speed = maxDiag / 9;
      const wave2Head  = (t * wave2Speed + maxDiag * 0.55) % maxDiag;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const diag = c + r;

          // Distance from wave head (with wrap-around)
          const d1 = Math.min(
            Math.abs(diag - waveHead),
            maxDiag - Math.abs(diag - waveHead)
          );
          const d2 = Math.min(
            Math.abs(diag - wave2Head),
            maxDiag - Math.abs(diag - wave2Head)
          );

          const i1 = d1 < waveWidth  ? (1 - d1 / waveWidth)  : 0;
          const i2 = d2 < wave2Width ? (1 - d2 / wave2Width) : 0;

          if (i1 > 0.01 || i2 > 0.01) {
            const x = c * CELL;
            const y = r * CELL;

            if (i1 > 0.01) {
              // Warm gold glow
              ctx.save();
              ctx.shadowColor  = `rgba(212,175,55,${i1 * 0.9})`;
              ctx.shadowBlur   = 10 * i1;
              ctx.strokeStyle  = `rgba(212,175,55,${i1 * 0.75})`;
              ctx.lineWidth    = 1.4 * i1 + 0.6;
              ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
              ctx.restore();
            }

            if (i2 > 0.01) {
              // Cool blue-white glow
              ctx.save();
              ctx.shadowColor  = `rgba(180,215,255,${i2 * 0.7})`;
              ctx.shadowBlur   = 8 * i2;
              ctx.strokeStyle  = `rgba(180,215,255,${i2 * 0.6})`;
              ctx.lineWidth    = 1.2 * i2 + 0.5;
              ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
              ctx.restore();
            }
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(3px)' }}
    />
  );
}
