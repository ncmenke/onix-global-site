import React, { useEffect, useState } from 'react';

const HyperionCinematic: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.05;
      setPulse(Math.sin(t) * 0.1 + 1); // Breather effect
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* The Sun Container */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center transform transition-transform duration-1000" style={{ transform: `scale(${pulse})` }}>
        
        {/* Layer 1: The Corona (SVG Filters) */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200">
          <defs>
            <filter id="fire">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="10" />
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <radialGradient id="sunGradient">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="40%" stopColor="#fbbf24" /> {/* Amber-400 */}
              <stop offset="70%" stopColor="#b45309" /> {/* Amber-700 */}
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="70" fill="url(#sunGradient)" filter="url(#fire)" opacity="0.8" />
        </svg>

        {/* Layer 2: The Core */}
        <div className="absolute w-[300px] h-[300px] bg-white rounded-full shadow-[0_0_100px_rgba(251,191,36,0.8)] mix-blend-screen blur-md"></div>
        
        {/* Layer 3: Magnetic Field Lines */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite_reverse]" viewBox="0 0 200 200">
           <circle cx="100" cy="100" r="85" fill="none" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
           <circle cx="100" cy="100" r="95" fill="none" stroke="#fbbf24" strokeWidth="0.2" strokeDasharray="20 40" opacity="0.2" />
        </svg>

      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
    </div>
  );
};

export default HyperionCinematic;