
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const isComplete = progress >= 100;

  return (
    <div className="w-full relative pt-6 mb-2"> {/* Added padding-top for the rocket */}
      
      {/* Rocket Indicator */}
      <motion.div
        className="absolute top-0 z-20 -ml-3" // -ml-3 centers the 24px rocket on the exact point
        initial={{ left: "0%" }}
        animate={{ 
            left: `${progress}%`,
            y: isComplete ? [0, -8, 0] : 0, // Bounce effect when complete
            scale: isComplete ? [1, 1.1, 1] : 1
        }}
        transition={{ 
            left: { duration: 0.5, ease: "easeInOut" },
            y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
            {/* The Rocket Icon */}
            <div className="transform rotate-45 text-brand-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                <Rocket size={24} fill="currentColor" />
            </div>
            
            {/* Fire trail effect */}
            <div className="absolute top-full right-full -mt-1 -mr-1">
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className="w-2 h-2 bg-orange-500 rounded-full blur-[2px]"
                 />
            </div>
        </div>
      </motion.div>

      {/* The Bar Track */}
      <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700 relative backdrop-blur-sm">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
        
        {/* The Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-brand-green to-emerald-300 rounded-full relative shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/30 skew-x-[-20deg] animate-pulse origin-left"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
