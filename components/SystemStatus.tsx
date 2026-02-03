import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemMetrics } from '../types';

interface SystemStatusProps {
  metricsHistory: SystemMetrics[];
}

const SystemStatus: React.FC<SystemStatusProps> = ({ metricsHistory }) => {
  return (
    <div className="w-full h-full bg-slate-900/30 rounded border border-slate-800 p-2 relative overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={metricsHistory}
          margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="timestamp" hide />
          <YAxis domain={[0, 1.2]} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#cbd5e1' }}
            itemStyle={{ color: '#06b6d4' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="entropy" 
            stackId="1" 
            stroke="#06b6d4" 
            fill="#06b6d4" 
            fillOpacity={0.1}
            isAnimationActive={false}
          />
          <Area 
            type="monotone" 
            dataKey="coherence" 
            stackId="2" 
            stroke="#8b5cf6" 
            fill="#8b5cf6" 
            fillOpacity={0.1} 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="absolute top-2 right-2 flex flex-col items-end pointer-events-none">
         <span className="text-[10px] text-slate-500 font-mono">LIVE FEED</span>
         <span className="text-[10px] text-cyan-500 font-mono animate-pulse">● REC</span>
      </div>
    </div>
  );
};

export default SystemStatus;