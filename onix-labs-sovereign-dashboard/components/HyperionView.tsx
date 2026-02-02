import React, { useState, useEffect, useRef } from 'react';
import { Zap, Thermometer, ShieldAlert, Atom, Info, Sliders } from 'lucide-react';
import { HyperionMetrics } from '../types';

const HyperionView: React.FC = () => {
  // User Controls
  const [magneticField, setMagneticField] = useState(50); 
  const [injectionRate, setInjectionRate] = useState(50); 
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation State
  const [metrics, setMetrics] = useState<HyperionMetrics>({
    plasmaStability: 0,
    outputMW: 0,
    coreTemp: 200,
    containmentField: 0
  });

  // 1. PHYSICS LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const optimalField = 85;
        const optimalInjection = 60;
        const fieldDelta = Math.abs(magneticField - optimalField);
        const injDelta = Math.abs(injectionRate - optimalInjection);
        const efficiency = Math.max(0, 1 - (fieldDelta * 0.025) - (injDelta * 0.025));
        
        const jitter = (Math.random() - 0.5);
        let newStability = efficiency * 15.0 + (jitter * 0.2); 
        let newOutput = efficiency * 2.5 + (jitter * 0.05); 
        let newTemp = 300 + (efficiency * 800) + (jitter * 10);
        let newContainment = efficiency * 0.92 + (jitter * 0.005); 

        return {
            plasmaStability: Math.max(0, newStability),
            outputMW: Math.max(0, newOutput),
            coreTemp: Math.floor(newTemp),
            containmentField: newContainment
        };
      });
    }, 200); // Faster updates for smoother UI
    return () => clearInterval(interval);
  }, [magneticField, injectionRate]);


  // 2. VISUALIZATION LOOP (Filament Render)
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const resize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
        const width = canvas.width;
        const height = canvas.height;
        const cx = width / 2;
        const cy = height / 2;

        // Visual Parameters based on Stability Metric
        // We read state directly if possible, or assume loop is fast enough. 
        // For smoother anim, we'll derive "chaos" from the metric we set.
        // NOTE: In a real app, use a Ref for metrics to avoid closure staleness in render loop.
        // We'll calculate a "Chaos Factor" inversely proportional to stability (15 = 0 chaos).
        // Since we can't easily access 'metrics' inside this closure without dependencies resetting the loop,
        // we will implement a small ref pattern for the metric.
    };
    // To properly access changing metrics without resetting the canvas, we use a ref:
    return () => { window.removeEventListener('resize', resize); }
  }, []); 

  // Better implementation of the canvas loop that has access to live metrics
  const metricsRef = useRef(metrics);
  useEffect(() => { metricsRef.current = metrics; }, [metrics]);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let time = 0;
      let animationId: number;

      const render = () => {
          const m = metricsRef.current;
          const stabilityRatio = Math.min(1, m.plasmaStability / 15); // 0 to 1 (1 is perfect)
          const chaos = 1 - stabilityRatio; // 1 is chaotic, 0 is stable

          const w = canvas.width;
          const h = canvas.height;
          const cx = w / 2;
          const cy = h / 2;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.4)'; // Fade effect
          ctx.fillRect(0,0,w,h);

          time += 0.02 + (chaos * 0.05); // Faster chaos

          // Draw Filaments
          const filamentCount = 12;
          const R = 80; // Major Radius
          const r = 30; // Minor Radius

          for(let i=0; i<filamentCount; i++) {
              ctx.beginPath();
              
              // Color Shift: Red (Chaos) -> Amber -> Cyan (Stable)
              let color = `hsl(190, 100%, 50%)`; // Cyan default
              if (chaos > 0.3) color = `hsl(40, 100%, 50%)`; // Amber
              if (chaos > 0.7) color = `hsl(0, 100%, 60%)`; // Red

              ctx.strokeStyle = color;
              ctx.lineWidth = 2;
              
              // Draw path around torus
              for(let theta=0; theta < Math.PI * 2; theta += 0.05) {
                  // Filament Twist (The Helix)
                  // 15:1 ratio means 15 twists per revolution for stability
                  const twist = 15; 
                  
                  // Chaos disrupts the twist frequency and adds noise
                  const noise = (Math.sin(theta * 20 + time * 5) * chaos * 20);
                  const phi = (theta * twist) + time + (i * (Math.PI * 2 / filamentCount));

                  const currentR = r + noise;
                  
                  // 3D Coords
                  const x3 = (R + currentR * Math.cos(phi)) * Math.cos(theta);
                  const y3 = (R + currentR * Math.cos(phi)) * Math.sin(theta);
                  const z3 = currentR * Math.sin(phi);

                  // Project 3D -> 2D (Simple Isometric-ish)
                  const scale = 300 / (300 + z3);
                  const x2 = cx + x3 * scale;
                  const y2 = cy + y3 * scale;

                  if (theta === 0) ctx.moveTo(x2, y2);
                  else ctx.lineTo(x2, y2);
              }
              ctx.stroke();
          }

          // Draw Core Glow
          const glowSize = 20 + (stabilityRatio * 40);
          const glowColor = chaos > 0.5 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(6, 182, 212, 0.3)';
          const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, glowSize);
          gradient.addColorStop(0, glowColor);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(cx, cy, glowSize, 0, Math.PI*2);
          ctx.fill();

          animationId = requestAnimationFrame(render);
      }
      render();
      return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 overflow-y-auto lg:overflow-hidden">
      
      {/* LEFT: Simulation Visuals */}
      <div className="flex-grow flex flex-col gap-6 min-h-[500px]">
          
          <div className="border border-amber-900/50 bg-slate-900/50 p-6 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
                    <Atom size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-amber-100">Hyperion Core Simulator</h2>
                    <div className="text-sm text-amber-500/80">Adjust fields to achieve 15:1 Harmonic Resonance</div>
                </div>
            </div>
            {/* Stability Badge */}
             <div className={`px-4 py-2 rounded border text-xs font-bold tracking-widest uppercase ${
                 metrics.plasmaStability > 14 ? 'bg-green-950/50 border-green-500 text-green-400' :
                 metrics.plasmaStability > 8 ? 'bg-amber-950/50 border-amber-500 text-amber-400' :
                 'bg-red-950/50 border-red-500 text-red-400'
             }`}>
                 {metrics.plasmaStability > 14 ? 'Topological Lock' : 'Plasma Instability'}
             </div>
          </div>

          <div className="flex-grow border border-amber-900/30 bg-slate-950 rounded-lg relative overflow-hidden flex flex-col items-center justify-center">
             <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
             
             {/* Overlay Data */}
             <div className="absolute bottom-6 left-6 flex gap-8 pointer-events-none">
                 <div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest">Resonance</div>
                     <div className="text-2xl font-mono text-white font-bold">{metrics.plasmaStability.toFixed(2)} <span className="text-sm text-slate-500">/ 15.0</span></div>
                 </div>
                 <div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest">Plasma Temp</div>
                     <div className="text-2xl font-mono text-white font-bold">{metrics.coreTemp} <span className="text-sm text-slate-500">°C</span></div>
                 </div>
             </div>
          </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="lg:w-80 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg space-y-8 shadow-xl">
              <div className="flex items-center gap-2 text-slate-100 font-bold border-b border-slate-800 pb-4">
                  <Sliders size={18} />
                  <span>CONFINEMENT CONTROLS</span>
              </div>

              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                      <label className="text-blue-400">MAGNETIC FIELD (TESLA)</label>
                      <span className="text-white">{magneticField} T</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={magneticField} 
                    onChange={(e) => setMagneticField(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                      <span>Loose</span>
                      <span>Optimal: 85</span>
                      <span>Choked</span>
                  </div>
              </div>

              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                      <label className="text-amber-400">DEUTERIUM INJECTION</label>
                      <span className="text-white">{injectionRate} mg/s</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={injectionRate} 
                    onChange={(e) => setInjectionRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                   <div className="flex justify-between text-[10px] text-slate-600">
                      <span>Starve</span>
                      <span>Optimal: 60</span>
                      <span>Flood</span>
                  </div>
              </div>
              
              <div className="bg-slate-950/50 p-4 rounded border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  <Info size={14} className="inline mr-2 text-slate-500" />
                  Aligning the magnetic field with fuel flow creates a <strong>Hopfion Knot</strong>—a self-stabilizing plasma topology that allows for continuous fusion without massive external power.
              </div>
          </div>
          
           {/* Output Metric */}
           <div className="bg-gradient-to-r from-slate-900 to-amber-950/20 border border-slate-800 p-6 rounded-lg flex items-center justify-between">
              <div>
                  <div className="text-xs text-slate-400 uppercase mb-1">Net Power Output</div>
                  <div className="text-3xl font-bold text-white font-mono">{metrics.outputMW.toFixed(2)} MW</div>
              </div>
              <Zap size={32} className={metrics.outputMW > 2.0 ? "text-amber-400 animate-pulse" : "text-slate-700"} />
          </div>

      </div>
    </div>
  );
};

export default HyperionView;