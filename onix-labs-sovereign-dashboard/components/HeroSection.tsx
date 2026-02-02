import React, { useState } from 'react';
import { Sector } from '../types';
import HyperionCinematic from './HyperionCinematic';
import SentinelCinematic from './SentinelCinematic';
import KernelCinematic from './KernelCinematic';
import MonolithUI from './MonolithUI';

const HeroSection: React.FC = () => {
  const [sector, setSector] = useState<Sector>(Sector.HYPERION);
  const [transitioning, setTransitioning] = useState(false);

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
        setSector(prev => {
            if (prev === Sector.HYPERION) return Sector.SENTINEL;
            if (prev === Sector.SENTINEL) return Sector.KERNEL;
            return Sector.HYPERION;
        });
        setTransitioning(false);
    }, 500); // Wait for fade out
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden sticky top-0 z-0">
        
        {/* Render Active Sector Visuals */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${transitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
            {sector === Sector.HYPERION && <HyperionCinematic />}
            {sector === Sector.SENTINEL && <SentinelCinematic />}
            {sector === Sector.KERNEL && <KernelCinematic />}
        </div>

        {/* UI Overlay (The Monolith) */}
        <MonolithUI activeSector={sector} onNext={handleNext} />
        
        {/* Vignette & Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Scroll Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <div className="w-[1px] h-12 bg-white"></div>
        </div>
    </section>
  );
};

export default HeroSection;