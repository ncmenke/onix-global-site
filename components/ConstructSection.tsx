import React from 'react';
import { motion } from 'framer-motion';
import { Box, Anchor, Ruler } from 'lucide-react';

const ConstructSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-zinc-200 text-slate-900 flex flex-col items-center justify-center py-24 px-6 z-10 overflow-hidden">
      
      {/* Background Texture (Concrete) */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
           style={{ 
               filter: 'contrast(120%) noise(0.1)',
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
           }}>
      </div>
      
      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{ 
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '100px 100px'
            }}>
      </div>

      <div className="max-w-7xl w-full z-10 space-y-24">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-end justify-between gap-12 border-b-4 border-black pb-12"
        >
            <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs tracking-widest uppercase font-bold">
                    <Anchor size={12} />
                    <span>The Construct</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black">
                    WE PRINT<br/>CIVILIZATIONS.
                </h2>
            </div>
            
            <div className="max-w-xs text-right md:text-left">
                <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">Universal Fabrication</p>
                <p className="text-lg font-bold leading-tight">
                    ONIX LABS is not just chips and energy. We print the facility that houses it.
                </p>
            </div>
        </motion.div>

        {/* Narrative Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex gap-4 items-start">
                     <div className="bg-black text-white p-3">
                        <Box size={24} />
                     </div>
                     <div>
                         <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">Material Agnostic</h3>
                         <p className="text-slate-700 leading-relaxed">
                             Our Monolithic Additive Manufacturing platform works with concrete, polymer, and alloy simultaneously. 
                         </p>
                     </div>
                </div>

                <div className="flex gap-4 items-start">
                     <div className="bg-black text-white p-3">
                        <Ruler size={24} />
                     </div>
                     <div>
                         <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">Unlimited Geometry</h3>
                         <p className="text-slate-700 leading-relaxed">
                             From rapid-deployment affordable housing to hardened defense bunkers. If you can design it, we can grow it.
                         </p>
                     </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-2 border border-slate-300 shadow-2xl relative"
            >
                <div className="absolute top-6 right-6 z-20 text-[10px] font-mono text-white/50 border border-white/20 px-2 py-1 bg-black/50 backdrop-blur">
                    MAG: 400x
                </div>
                
                {/* Visual: Hexagonally Weaved Material with Embedded Circuitry */}
                <div className="h-64 w-full bg-slate-900 relative overflow-hidden group">
                    
                    {/* SVG Pattern Definition */}
                    <svg className="absolute inset-0 w-full h-full" width="100%" height="100%">
                        <defs>
                            {/* Hexagon Pattern */}
                            <pattern id="hexWeave" x="0" y="0" width="40" height="68" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                                <path d="M20 0 L40 11 L40 34 L20 45 L0 34 L0 11 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                            </pattern>
                            
                            {/* Glowing Circuit Gradient */}
                            <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                            </linearGradient>

                            {/* Glow Filter */}
                             <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Base Dark Material */}
                        <rect width="100%" height="100%" fill="#0f172a" />
                        
                        {/* Weave Layer */}
                        <rect width="100%" height="100%" fill="url(#hexWeave)" />
                        
                        {/* Embedded Circuitry - Procedural Lines */}
                        <g filter="url(#glow)">
                             {/* Circuit Path 1 */}
                             <path d="M-10,150 L80,150 L100,120 L150,120 L180,80 L250,80" 
                                   fill="none" 
                                   stroke="#b45309" 
                                   strokeWidth="2" 
                                   className="opacity-40" />
                             
                             {/* Active Current Animation */}
                             <path d="M-10,150 L80,150 L100,120 L150,120 L180,80 L250,80" 
                                   fill="none" 
                                   stroke="url(#circuitGlow)" 
                                   strokeWidth="2" 
                                   strokeDasharray="50 150"
                                   className="animate-[dash_3s_linear_infinite]" />

                             {/* Circuit Path 2 */}
                             <path d="M300,50 L250,50 L220,100 L150,100 L120,180 L50,180" 
                                   fill="none" 
                                   stroke="#b45309" 
                                   strokeWidth="2" 
                                   className="opacity-40" />

                             <path d="M300,50 L250,50 L220,100 L150,100 L120,180 L50,180" 
                                   fill="none" 
                                   stroke="url(#circuitGlow)" 
                                   strokeWidth="2" 
                                   strokeDasharray="50 150"
                                   className="animate-[dash_4s_linear_infinite_reverse]" />
                        </g>

                        {/* Nodes */}
                        <circle cx="150" cy="120" r="3" fill="#fbbf24" className="animate-pulse" filter="url(#glow)" />
                        <circle cx="220" cy="100" r="2" fill="#d97706" filter="url(#glow)" />
                        
                    </svg>
                    
                    {/* Shadow/Vignette Overlay for depth */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>

                    {/* Bottom Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-white font-bold uppercase tracking-widest text-sm">Smart-Weave Polymer</div>
                        <div className="text-[10px] text-amber-500 font-mono flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                             Sensors Online
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-end">
                     <div>
                         <div className="text-xs font-bold uppercase tracking-widest text-slate-900">Composite Matrix</div>
                         <div className="text-[10px] text-slate-500 font-mono">Imbedded Logic Mesh</div>
                     </div>
                     <div className="h-1 w-24 bg-gradient-to-r from-slate-300 to-black"></div>
                </div>
            </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ConstructSection;