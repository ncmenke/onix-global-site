import React, { useEffect, useRef } from 'react';

interface TorusVizProps {
  entropy: number; 
  inputActive: boolean;
}

const TorusViz: React.FC<TorusVizProps> = ({ entropy, inputActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use refs to pass props into the animation loop without triggering re-initialization
  const propsRef = useRef({ entropy, inputActive });
  useEffect(() => {
    propsRef.current = { entropy, inputActive };
  }, [entropy, inputActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialization (Runs ONCE)
    const particleCount = 2000;
    const R = 80; // Major radius
    const r = 35; // Minor radius

    const particles: { theta: number; phi: number; speedTheta: number; speedPhi: number; baseR: number; jitter: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.random() * Math.PI * 2,
        speedTheta: (Math.random() - 0.5) * 0.02,
        speedPhi: (Math.random() - 0.5) * 0.02,
        baseR: r,
        jitter: 0
      });
    }

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      const { entropy, inputActive } = propsRef.current;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Dynamics
      const spinSpeed = inputActive ? 0.03 : 0.008;
      const targetJitter = inputActive ? 0.8 : (entropy * 12); 
      
      rotX += spinSpeed * 0.5;
      rotY += spinSpeed;

      // Clear with trail
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Render Particles
      particles.forEach(p => {
        // Update physics
        p.theta += p.speedTheta;
        p.phi += p.speedPhi;
        
        // Smoothly interpolate jitter to avoid snapping
        p.jitter += (targetJitter - p.jitter) * 0.05;

        // Torus Math
        const currentR = p.baseR + (Math.random() - 0.5) * p.jitter;
        const x3D = (R + currentR * Math.cos(p.phi)) * Math.cos(p.theta);
        const y3D = (R + currentR * Math.cos(p.phi)) * Math.sin(p.theta);
        const z3D = currentR * Math.sin(p.phi);

        // Rotation
        let x1 = x3D * Math.cos(rotY) - z3D * Math.sin(rotY);
        let z1 = x3D * Math.sin(rotY) + z3D * Math.cos(rotY);
        let y2 = y3D * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y3D * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Projection
        const fov = 350;
        const scale = fov / (fov + z2);
        const x2D = centerX + x1 * scale;
        const y2D = centerY + y2 * scale;
        const size = Math.max(0.2, 1.8 * scale);

        const alpha = Math.max(0.05, (z2 + 60) / 120);
        
        // Color Logic
        const hue = inputActive ? 190 : 200; // Cyan/Blue
        const saturation = inputActive ? '100%' : '80%';
        
        ctx.fillStyle = `hsla(${hue}, ${saturation}, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2D, y2D, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array = persistent animation

  return (
    <canvas ref={canvasRef} className="w-full h-full bg-slate-900/30 rounded border border-slate-800" />
  );
};

export default TorusViz;