import React, { useState, useEffect } from 'react';
import { Network, Split, ArrowRightLeft, Zap, Lightbulb } from 'lucide-react';

const SentinelView: React.FC = () => {
  const [phaseShift, setPhaseShift] = useState(0); // 0 to 180 degrees (PI)

  // Constructive Interference: 0 shift = Max signal
  // Destructive Interference: 180 shift = 0 signal
  // Let's map 0-100 slider to 0-PI
  const phaseRad = (phaseShift / 100) * Math.PI;
  const interference = Math.cos(phaseRad / 2); // Simple amplitude factor approximation
  const outputIntensity = Math.pow(interference, 2); // Intensity is amplitude squared

  // Determine Logic State
  const logicState = outputIntensity > 0.8 ? 1 : 0;

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
       {/* Header */}
       <div className="border border-violet-900/50 bg-slate-900/50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-500">
                <Network size={28} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-violet-100">Photonic Logic Gate</h2>
                <div className="text-sm text-violet-500/80">Mach-Zehnder Interferometer Demo</div>
            </div>
        </div>
        <div className="text-right hidden md:block max-w-md text-xs text-slate-400">
            Traditional chips use electricity (resistance = heat). Sentinel chips use light interference to calculate. 
            <span className="text-violet-400 font-bold block mt-1">Zero Resistance. Zero Heat. Speed of Light.</span>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
          
          {/* Main Visualization Area */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-950/20 to-slate-950"></div>
              
              {/* SCHEMATIC VISUALIZATION */}
              <div className="relative w-full max-w-2xl h-64 flex items-center justify-between z-10">
                  
                  {/* Laser Source */}
                  <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded bg-slate-800 border border-slate-600 flex items-center justify-center relative shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                          <Zap size={20} className="text-violet-400" />
                          <div className="absolute right-[-100px] top-1/2 h-[2px] w-[100px] bg-violet-500 shadow-[0_0_10px_#8b5cf6]"></div>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">Input Laser</span>
                  </div>

                  {/* The Interferometer Circuit */}
                  <div className="flex-grow mx-4 h-32 relative">
                      {/* Splitter */}
                      <div className="absolute left-0 top-1/2 w-4 h-8 border-l-2 border-slate-600 transform -translate-y-1/2"></div>
                      
                      {/* Top Path (Reference) */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-violet-500/50 overflow-hidden">
                          {/* Animated Sine Wave */}
                          <div className="w-full h-full animate-pulse bg-violet-400/80"></div>
                      </div>

                      {/* Bottom Path (Phase Shifter) */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500/50 flex items-center justify-center">
                          {/* The Shifter Node */}
                          <div className={`w-24 h-6 border rounded transition-colors duration-300 flex items-center justify-center text-[10px] font-mono
                            ${phaseShift > 10 ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-slate-700 bg-slate-900 text-slate-600'}
                          `}>
                              PHASE SHIFT
                          </div>
                          {/* Wave representation */}
                          <div className="absolute inset-0 overflow-hidden opacity-50">
                                <div className="w-full h-full bg-violet-400/80" 
                                     style={{ transform: `translateX(${phaseShift}px)` }}></div>
                          </div>
                      </div>

                      {/* Combiner */}
                      <div className="absolute right-0 top-1/2 w-4 h-8 border-r-2 border-slate-600 transform -translate-y-1/2"></div>
                      
                      {/* Connecting vertical lines */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-slate-800"></div>
                  </div>

                  {/* Detector / Output */}
                  <div className="flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-2xl
                         ${outputIntensity > 0.1 
                            ? 'border-violet-400 bg-violet-500 shadow-[0_0_50px_#8b5cf6]' 
                            : 'border-slate-800 bg-slate-900'}
                      `}
                      style={{ opacity: 0.3 + outputIntensity }}
                      >
                          <Lightbulb size={24} className={outputIntensity > 0.1 ? "text-white" : "text-slate-700"} />
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">Output Detector</span>
                  </div>
              </div>

              {/* Sine Wave Comparison (Educational) */}
              <div className="mt-12 w-full max-w-lg bg-slate-900/50 p-4 rounded border border-slate-800 flex gap-8 items-center justify-center z-10">
                  <div className="text-center">
                      <div className="h-12 w-24 relative flex items-center">
                          {/* Reference Wave */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
                              <path d="M0,25 Q25,0 50,25 T100,25" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                          </svg>
                          {/* Shifted Wave */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" style={{ opacity: 0.7 }}>
                              <path d="M0,25 Q25,0 50,25 T100,25" fill="none" stroke="#f59e0b" strokeWidth="2" 
                                    transform={`translate(${phaseShift / 2}, 0)`} />
                          </svg>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">Wave Interference</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-700"></div>
                  <div className="text-center w-24">
                       <div className="text-2xl font-bold font-mono text-white">
                           {logicState}
                       </div>
                       <div className="text-[10px] text-slate-500 uppercase">Logic Bit</div>
                  </div>
              </div>

          </div>

          {/* Controls Column */}
          <div className="flex flex-col gap-6">
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col gap-4 shadow-lg">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                      <ArrowRightLeft size={16} />
                      <span>PHASE CONTROL</span>
                  </div>
                  
                  <div className="relative pt-6 pb-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={phaseShift}
                        onChange={(e) => setPhaseShift(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                          <span>0° (Aligned)</span>
                          <span>180° (Opposite)</span>
                      </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded border border-slate-800">
                      By delaying light in the bottom path, we align the wave peaks (1) or misalign them (0). This switching happens in picoseconds.
                  </p>
              </div>

              <div className="flex-grow bg-gradient-to-br from-violet-950/20 to-slate-900 border border-violet-900/30 p-6 rounded-xl flex flex-col justify-center items-center text-center gap-2">
                  <div className="text-xs text-violet-400 uppercase tracking-widest mb-2">Theoretical Speed</div>
                  <div className="text-5xl font-mono text-white font-bold tracking-tighter">
                      {(outputIntensity * 128).toFixed(1)} <span className="text-lg text-slate-500">Tbps</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2">
                      Current Throughput
                  </div>
              </div>

          </div>

      </div>
    </div>
  );
};

export default SentinelView;