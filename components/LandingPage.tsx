import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Zap, Network, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [text, setText] = useState('');
  const fullText = "CONNECTING TO PUBLIC GRID...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-slate-200 font-mono">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>
      
      {/* Animated Grid Floor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent)',
             backgroundSize: '50px 50px',
             transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'
           }}>
      </div>

      <div className="z-10 max-w-5xl w-full px-6 flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Hero Section */}
        <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-xs tracking-widest uppercase mb-4">
                <Sparkles size={12} />
                <span>The Future is Now Live</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
              ONIX
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/80 font-light tracking-wide max-w-2xl mx-auto">
                First-Principles Technology for a Post-Scarcity World.
            </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
            <div className="bg-slate-900/40 backdrop-blur border border-slate-800 p-6 rounded-xl hover:border-amber-500/50 transition-colors group text-left">
                <div className="w-10 h-10 rounded bg-amber-950/50 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                    <Zap size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Infinite Energy</h3>
                <p className="text-sm text-slate-400">Mark IV Hyperion Reactors providing clean, A-Neutronic fusion power to the entire metropolitan grid.</p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur border border-slate-800 p-6 rounded-xl hover:border-violet-500/50 transition-colors group text-left">
                <div className="w-10 h-10 rounded bg-violet-950/50 flex items-center justify-center text-violet-500 mb-4 group-hover:scale-110 transition-transform">
                    <Network size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Instant Thought</h3>
                <p className="text-sm text-slate-400">Sentinel Photonic Arrays processing city data at light speed. Zero latency, infinite possibility.</p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur border border-slate-800 p-6 rounded-xl hover:border-cyan-500/50 transition-colors group text-left">
                <div className="w-10 h-10 rounded bg-cyan-950/50 flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 transition-transform">
                    <Globe size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Global Unity</h3>
                <p className="text-sm text-slate-400">Ending resource scarcity through sovereign, decentralized infrastructure. Technology for the people.</p>
            </div>
        </div>

        {/* Call to Action */}
        <div className="pt-8 flex flex-col items-center">
            <button 
                onClick={onEnter}
                className="group relative px-10 py-5 bg-white text-slate-950 font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
                <div className="relative flex items-center gap-3 text-lg tracking-widest">
                    <span>ENTER THE CITY GRID</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </button>
            <div className="mt-6 text-[10px] text-cyan-500/60 font-mono h-4">
                {text}
            </div>
        </div>

      </div>

      <div className="absolute bottom-4 text-center w-full text-[10px] text-slate-600">
          ONIX LABS GLOBAL &copy; 2025 | EMPOWERING HUMANITY
      </div>

    </div>
  );
};

export default LandingPage;