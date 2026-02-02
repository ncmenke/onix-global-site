import React, { useEffect, useRef } from 'react';

const SentinelCinematic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const particleCount = 1500;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2,
        alpha: Math.random()
      });
    }

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Clear with trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        // Flow Field Logic (Simulating Light Data Streams)
        const angle = Math.cos(p.x * 0.005 + time) * Math.sin(p.y * 0.005 + time) * Math.PI * 2;
        
        p.vx += Math.cos(angle) * 0.05;
        p.vy += Math.sin(angle) * 0.05;
        
        // Dampen
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw
        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        const colorIntensity = Math.min(1, speed * 0.5);
        
        ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`; // Violet
        if (speed > 2) ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; // White hot data

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + speed/2), 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <canvas ref={canvasRef} className="w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none"></div>
    </div>
  );
};

export default SentinelCinematic;