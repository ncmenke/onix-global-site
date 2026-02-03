import React, { useRef, useEffect, useState } from 'react';
import { Message } from '../types';
import { Send, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface TerminalProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isStreaming: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ messages, onSendMessage, isStreaming }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/80 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-md relative shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-slate-800 z-10">
        <div className="flex items-center gap-3 text-cyan-400">
          <TerminalIcon size={18} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">ONIX City Interface</span>
        </div>
        <div className="flex items-center gap-2">
           <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></span>
           <span className="text-[10px] text-slate-500 uppercase font-bold">{isStreaming ? 'THINKING' : 'READY'}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 z-10 font-sans text-sm custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
             <Sparkles size={48} className="opacity-20" />
             <p>Welcome, Citizen. Ask me about the city's infrastructure.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-slate-100 rounded-tr-none' 
                : 'bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-slate-300 rounded-tl-none'
            }`}>
              <div className="flex items-center gap-2 mb-2 opacity-50 text-[10px] uppercase tracking-wider font-bold">
                <span>{msg.role === 'model' ? 'ONIX AI' : 'CITIZEN'}</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-950 border-t border-slate-800 z-10">
        <div className="flex gap-4 bg-slate-900/50 p-2 rounded-full border border-slate-800 focus-within:border-cyan-500/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the grid..."
            className="flex-grow bg-transparent border-none outline-none text-slate-200 px-4 placeholder-slate-600"
            disabled={isStreaming}
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isStreaming}
            className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white hover:bg-cyan-500 disabled:opacity-30 disabled:hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Terminal;