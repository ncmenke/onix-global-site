import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Layers, Box, Flame } from 'lucide-react';

const ForgeSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center py-24 px-6 z-10 border-t border-orange-900/20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-900/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl w-full z-10 space-y-24">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/30 border border-orange-800/50 text-orange-500 text-xs tracking-widest uppercase">
                <Flame size={12} />
                <span>The Forge</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-900">
                GROWN.<br/>NOT ASSEMBLED.
            </h2>
            <p className="text-xl md:text-2xl text-orange-100/60 font-light tracking-wide max-w-3xl mx-auto">
                Traditional supply chains are fragile. We eliminated them. The Mark IV core is Monolithically Printed from NASA-grade GRCop-42 alloy in a single shot.
            </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 p-8 rounded-2xl overflow-hidden transition-all duration-500"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/0 via-orange-900/0 to-orange-900/10 group-hover:to-orange-900/20 transition-all"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-6">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">GRCop-42 COPPER</h3>
                    <p className="text-sm text-slate-400 mb-4 tracking-wide">WITHSTANDS 3,300°C</p>
                    <div className="h-[1px] w-12 bg-orange-500/30 mb-4"></div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        An advanced copper-chromium-niobium alloy developed for rocket combustion chambers. 400x the thermal conductivity of standard aerospace alloys.
                    </p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 p-8 rounded-2xl overflow-hidden transition-all duration-500"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-orange-900/0 via-orange-900/0 to-orange-900/10 group-hover:to-orange-900/20 transition-all"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-6">
                        <Hammer size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">LASER SINTERING</h3>
                    <p className="text-sm text-slate-400 mb-4 tracking-wide">ATOMIC PRECISION</p>
                    <div className="h-[1px] w-12 bg-orange-500/30 mb-4"></div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        12-laser Powder Bed Fusion system welds the entire reactor core as a single contiguous object. No welds to crack. No gaskets to leak.
                    </p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 p-8 rounded-2xl overflow-hidden transition-all duration-500"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-orange-900/0 via-orange-900/0 to-orange-900/10 group-hover:to-orange-900/20 transition-all"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-6">
                        <Box size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">20FT ISO FORMAT</h3>
                    <p className="text-sm text-slate-400 mb-4 tracking-wide">PLUG & PLAY</p>
                    <div className="h-[1px] w-12 bg-orange-500/30 mb-4"></div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        The entire power plant fits within standard intermodal shipping dimensions. Deploys to disaster zones or urban centers by truck, train, or air.
                    </p>
                </div>
            </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ForgeSection;