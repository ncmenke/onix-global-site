import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

const TerminalFooter: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SECURED'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
        setStatus('SECURED');
        setInput('');
        setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <footer className="w-full bg-black border-t border-slate-900 py-12 px-6 z-10 relative">
      <div className="max-w-2xl mx-auto font-mono">
        
        <div className="flex items-center gap-2 text-slate-500 mb-4 text-xs tracking-widest uppercase">
            <Terminal size={14} />
            <span>Secure Handshake Protocol v4.0</span>
        </div>

        <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500">
                &gt;
            </div>
            <input 
                type="email" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={status === 'SECURED' ? "" : "INITIALIZE ENCRYPTED HANDSHAKE (ENTER EMAIL)"}
                disabled={status === 'SECURED'}
                className="w-full bg-slate-900/30 border border-slate-800 rounded p-4 pl-10 text-cyan-400 placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            
            {status === 'SECURED' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-xs font-bold tracking-widest animate-pulse">
                    TRANSMISSION SECURED
                </div>
            )}
        </form>

        <div className="mt-12 flex justify-between text-[10px] text-slate-700 uppercase tracking-widest">
            <div>Onix Labs Global</div>
            <div>Encrypted: AES-256</div>
            <div>Global</div>
        </div>

      </div>
    </footer>
  );
};

export default TerminalFooter;