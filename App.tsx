import React from 'react';
import HeroSection from './components/HeroSection';
import ForgeSection from './components/ForgeSection';
import SanctuarySection from './components/SanctuarySection';
import ConstructSection from './components/ConstructSection';
import ManifestoSection from './components/ManifestoSection';
import TerminalFooter from './components/TerminalFooter';

const App: React.FC = () => {
  return (
    <main className="bg-black w-full min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100">
       {/* Section 1: The Monolith (Hero) */}
       <HeroSection />

       {/* Section 2: The Forge (Manufacturing - Orange) */}
       <ForgeSection />

       {/* Section 3: The Sanctuary (Sentinel Manufacturing - Violet) */}
       <SanctuarySection />

       {/* Section 4: The Construct (Civilization - White/Concrete) */}
       <ConstructSection />

       {/* Section 5: The Manifesto (Black) */}
       <ManifestoSection />

       {/* Footer: Contact */}
       <TerminalFooter />
    </main>
  );
};

export default App;