
import React from 'react';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const HeaderLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2 mb-2">
      <div className="flex items-center gap-3">
        <div className="relative">
            {/* Glow effect behind rocket */}
            <div className="absolute inset-0 bg-brand-purple blur-lg opacity-60 rounded-full"></div>
            <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Rocket className="w-8 h-8 text-brand-purple drop-shadow-[0_0_8px_rgba(168,85,247,1)]" fill="currentColor" />
            </motion.div>
        </div>
        <h1 className="text-2xl font-black tracking-tighter italic flex items-baseline">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                MONEY
            </span>
            <span className="text-white ml-1.5 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                BOOSTER
            </span>
        </h1>
      </div>
    </div>
  );
};

export default HeaderLogo;
