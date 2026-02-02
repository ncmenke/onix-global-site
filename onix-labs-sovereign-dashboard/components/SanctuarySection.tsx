import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

const SanctuarySection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center py-24 px-6 z-10 border-t border-violet-900/20 overflow-hidden">
      
      {/* Background Ambience (Neon Mesh Vibe) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-900/10 blur-[150px]"></div>
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ 
                   backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
                   backgroundSize: '40px 40px'
               }}>
          </div>
      </div>

      <div className="max-w-7xl w-full z-10 space-y-24">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/30 border border-violet-800/50 text-violet-400 text-xs tracking-widest uppercase">
                <Cpu size={12} />
                <span>The Sanctuary</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-violet-200 via-violet-400 to-violet-900 uppercase">
                Silicon<br/>Is Dead.
            </h2>
            <p className="text-xl md:text-2xl text-violet-100/60 font-light tracking-wide max-w-3xl mx-auto">
                We have left the electron behind. The Sentinel architecture relies on Imbedded Photonic Circuitry—channels of pure light printed directly into the chassis.
            </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Scale */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 p-8 rounded-2xl overflow-hidden transition-all duration-500"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/0 via-violet-900/0 to-violet-900/10 group-hover:to-violet-900/20 transition-all"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Hyper-Scale Density</h3>
                    <div className="h-[1px] w-12 bg-violet-500/50 mb-4"></div>
                    <p className="text-sm text-slate-400 mb-4 tracking-wide font-mono">SCALING TO TRILLIONS</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Scaling to hundreds of trillions of transistors. Moore’s Law didn't die; it just needed a new medium.
                    </p>
                </div>
            </motion.div>

            {/* Card 2: Security (The Hero Card) */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="group relative bg-violet-950/20 border border-violet-500/30 hover:border-violet-400/80 p-8 rounded-2xl overflow-hidden transition-all duration-500 shadow-[0_0_30px_rgba(139,92,246,0.1)]"
            >
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center text-violet-400">
                            <ShieldCheck size={24} />
                        </div>
                        {/* Rotating Element */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="opacity-20 text-violet-500"
                        >
                            <Cpu size={48} />
                        </motion.div>
                    </div>
                   
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">The Iron Clad</h3>
                    <div className="h-[1px] w-12 bg-violet-500/50 mb-4"></div>
                    <p className="text-sm text-violet-300 mb-4 tracking-wide font-mono">PHYSICALLY IMMUNE</p>
                    <p className="text-xs text-violet-200/70 leading-relaxed">
                        Every logic core is encased in a Monolithically Printed Faraday Cage. Physical immunity to EMP and signal snooping. Security is not software; it is physics.
                    </p>
                </div>
            </motion.div>

            {/* Card 3: Speed */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 p-8 rounded-2xl overflow-hidden transition-all duration-500"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-violet-900/0 via-violet-900/0 to-violet-900/10 group-hover:to-violet-900/20 transition-all"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Terahertz Clock</h3>
                    <div className="h-[1px] w-12 bg-violet-500/50 mb-4"></div>
                    <p className="text-sm text-slate-400 mb-4 tracking-wide font-mono">SPEED OF LIGHT</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Compute at the speed of light. Zero resistance. Zero heat throttling. Logic happens as fast as photons can travel.
                    </p>
                </div>
            </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SanctuarySection;