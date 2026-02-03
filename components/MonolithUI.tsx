import React, { useEffect, useState, useRef } from 'react';
import { Sector } from '../types';
import { ArrowRight, Activity } from 'lucide-react';

interface MonolithUIProps {
  activeSector: Sector;
  onNext: () => void;
}

const MonolithUI: React.FC<MonolithUIProps> = ({ activeSector, onNext }) => {
  const [metric, setMetric] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fake Counter Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetric(prev => prev + Math.floor(Math.random() * 1024));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Audio Waveform Visualization (Fake)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let t = 0;
    const draw = () => {
        t += 0.2;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height/2);
        
        for(let x=0; x<canvas.width; x++) {
            // Complex waveform math
            const y = (Math.sin(x * 0.05 + t) * Math.sin(x * 0.01 + t*0.5) * 15) + canvas.height/2;
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        requestAnimationFrame(draw);
    };
    draw();
  }, []);

  // Config based on sector
  const content = {
    [Sector.HYPERION]: {
        title: "THE FIRST STAR",
        subtext: "NET ZERO. A-NEUTRONIC. INFINITE.",
        metricLabel: "JOULES HARVESTED",
        color: "text-amber-400"
    },
    [Sector.SENTINEL]: {
        title: "THINKING AT LIGHT SPEED",
        subtext: "NO SILICON. NO HEAT. PURE PHOTON LOGIC.",
        metricLabel: "LATENCY (ms)",
        metricValue: "0.00000",
        color: "text-violet-400"
    },
    [Sector.KERNEL]: {
        title: "THE CODE OF NATURE",
        subtext: "SYMPLECTIC PHYSICS. SELF-HEALING. SOVEREIGN.",
        metricLabel: "SYSTEM ENTROPY",
        metricValue: "NEGATIVE",
        color: "text-cyan-400"
    }
  };

  const activeContent = content[activeSector];

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-between p-12 pointer-events-none">
      
      {/* TOP LEFT: Brand */}
      <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-white/20 bg-white/5 backdrop-blur rounded-full flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full animate-pulse ${activeSector === Sector.HYPERION ? 'bg-amber-400' : activeSector === Sector.SENTINEL ? 'bg-violet-400' : 'bg-cyan-400'}`}></div>
          </div>
          <div>
              <h1 className="font-mono text-xs tracking-[0.3em] text-white/60">ONIX LABS</h1>
              <div className="font-mono text-[10px] tracking-widest text-white/30">EST. 2025</div>
          </div>
      </div>

      {/* CENTER: The Monolith Info */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl text-center">
          <h2 className="text-8xl md:text-9xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 animate-in fade-in slide-in-from-bottom-10 duration-1000 key={activeSector}">
              {activeContent.title}
          </h2>
          <p className={`mt-6 text-sm md:text-xl font-light tracking-[0.5em] uppercase ${activeContent.color} animate-in fade-in duration-1000 delay-300`}>
              {activeContent.subtext}
          </p>
      </div>

      {/* BOTTOM: Navigation & Metrics */}
      <div className="flex items-end justify-between w-full">
          
          {/* Audio Waveform */}
          <div className="hidden md:block w-64 h-16 opacity-50">
               <canvas ref={canvasRef} width={256} height={64} className="w-full h-full" />
          </div>

          {/* Navigation Control (Pointer Events Enabled) */}
          <div className="glass-panel px-8 py-6 rounded-2xl flex items-center gap-12 pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors group" onClick={onNext}>
              <div className="flex flex-col text-right">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                      {activeContent.metricLabel}
                  </span>
                  <span className="text-2xl font-mono text-white tracking-widest tabular-nums">
                      {activeContent.metricValue || metric.toLocaleString()}
                  </span>
              </div>
              <div className="h-12 w-[1px] bg-white/20"></div>
              <div className="flex items-center gap-4 text-white/80 group-hover:text-white group-hover:gap-6 transition-all">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">Next Sector</span>
                  <ArrowRight size={16} />
              </div>
          </div>

      </div>
    </div>
  );
};

export default MonolithUI;