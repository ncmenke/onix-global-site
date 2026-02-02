import React, { useEffect, useRef } from 'react';

const KernelCinematic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Lorenz Attractor Parameters
    let x = 0.1, y = 0, z = 0;
    const sigma = 10;
    const rho = 28;
    const beta = 8.0 / 3.0;
    const dt = 0.01;

    const points: {x: number, y: number, z: number, hue: number}[] = [];
    const maxPoints = 3000;
    let rotation = 0;

    let animationId: number;

    const render = () => {
      // Background clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Math Step
      // Multiple steps per frame for smooth line
      for (let i = 0; i < 5; i++) {
          const dx = sigma * (y - x) * dt;
          const dy = (x * (rho - z) - y) * dt;
          const dz = (x * y - beta * z) * dt;
          x += dx;
          y += dy;
          z += dz;
          points.push({ x, y, z, hue: (z * 2) + 180 }); // Cyan/Blue hue base
      }

      if (points.length > maxPoints) {
          points.splice(0, 5); // Remove old points
      }

      rotation += 0.005;

      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // 3D Projection
      const scale = 15;
      const cx = width / 2;
      const cy = height / 2;

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Rotate Y
        const x1 = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
        const z1 = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        
        // Simple Perspective
        const persp = 600 / (600 + z1); // Perspective scale
        const px = cx + x1 * scale * persp;
        const py = cy + (p.y * scale * persp) + 50; // Offset Y slightly

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
            // Draw segment with color based on Z
            ctx.strokeStyle = `hsla(${p.hue}, 100%, 50%, 0.8)`;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
        }
      }

      // Draw Head
      const head = points[points.length - 1];
       // Rotate Y Head
       const hx1 = head.x * Math.cos(rotation) - head.z * Math.sin(rotation);
       const hz1 = head.x * Math.sin(rotation) + head.z * Math.cos(rotation);
       const hpersp = 600 / (600 + hz1);
       const hpx = cx + hx1 * scale * hpersp;
       const hpy = cy + (head.y * scale * hpersp) + 50;
       
       ctx.fillStyle = '#fff';
       ctx.shadowBlur = 20;
       ctx.shadowColor = '#06b6d4';
       ctx.beginPath();
       ctx.arc(hpx, hpy, 4, 0, Math.PI*2);
       ctx.fill();
       ctx.shadowBlur = 0;

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
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default KernelCinematic;