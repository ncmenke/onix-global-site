import React from 'react';
import { motion } from 'framer-motion';

const ManifestoSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center px-6 z-10 border-t border-slate-900">
      
      <div className="max-w-5xl w-full text-center space-y-16">
        
        <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-9xl font-black tracking-tighter text-white uppercase"
        >
            Total<br/>Independence.
        </motion.h2>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
        >
            <div className="h-[1px] w-24 bg-white mx-auto"></div>
            
            <p className="text-xl md:text-3xl font-light leading-relaxed text-slate-300 max-w-3xl mx-auto">
                Own your energy. Own your intelligence. Own your infrastructure.
                <br/>
                <span className="text-white font-medium block mt-4">Welcome to the Post-State Era.</span>
            </p>
            
        </motion.div>

      </div>

    </section>
  );
};

export default ManifestoSection;