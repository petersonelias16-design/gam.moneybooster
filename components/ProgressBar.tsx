
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const isComplete = progress >= 100;

  return (
    <div className="w-full relative pt-8 mb-2"> {/* Added padding-top for the rocket */}
      
      {/* Rocket Indicator */}
      <motion.div
        className="absolute top-0 z-20 -ml-4" // Adjusted margin to center the larger rocket
        initial={{ left: "0%" }}
        animate={{ 
            left: `${progress}%`,
            y: isComplete ? [0, -10, 0] : 0, // Bouncing higher when complete
            rotate: isComplete ? [0, -5, 5, 0] : 0, // Subtle wiggle when complete
            scale: isComplete ? 1.1 : 1
        }}
        transition={{ 
            left: { duration: 0.5, ease: "easeInOut" },
            y: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.5 }
        }}
      >
        <div className="relative">
            {/* Custom 3D Rocket SVG */}
            <div className="transform rotate-45 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
               <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* 3D Body Gradient - Brand Purple */}
                    <linearGradient id="rocketBody" x1="16" y1="2" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#d8b4fe" /> {/* light highlight */}
                        <stop offset="40%" stopColor="#a855f7" /> {/* brand purple */}
                        <stop offset="100%" stopColor="#581c87" /> {/* dark purple shadow */}
                    </linearGradient>
                    {/* Window Gradient - Glassy Look */}
                    <linearGradient id="windowGlass" x1="16" y1="10" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#67e8f9" /> 
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    {/* Metal Fins Gradient */}
                    <linearGradient id="fins" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7e22ce" />
                        <stop offset="100%" stopColor="#3b0764" />
                    </linearGradient>
                  </defs>
                  
                  {/* Left Fin (Darker for depth) */}
                  <path d="M9 18L5 25L10 24L9 18Z" fill="url(#fins)" />
                  {/* Right Fin */}
                  <path d="M23 18L27 25L22 24L23 18Z" fill="url(#fins)" />
                  
                  {/* Main Body */}
                  <path d="M16 2C16 2 8 12 8 20C8 24 10 26 16 26C22 26 24 24 24 20C24 12 16 2 16 2Z" fill="url(#rocketBody)" />
                  
                  {/* Center Fin (Front view perspective) */}
                  <path d="M16 18V26" stroke="#4c1d95" strokeWidth="1" opacity="0.5" />
                  
                  {/* Window Ring */}
                  <circle cx="16" cy="13" r="4" fill="#3b0764" />
                  {/* Window Glass */}
                  <circle cx="16" cy="13" r="3" fill="url(#windowGlass)" />
                  {/* Window Glare */}
                  <circle cx="17" cy="12" r="1" fill="white" opacity="0.9" />
                  
                  {/* Engine Nozzle */}
                  <path d="M12 26H20L19 27H13L12 26Z" fill="#1e1b4b" />
               </svg>
            </div>
            
            {/* Fire trail effect */}
            <div className="absolute top-[85%] left-[10%] -z-10">
                 <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1], 
                        opacity: [0.8, 0.4, 0.8],
                        height: [10, 15, 10] 
                    }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                    className="w-3 h-3 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-[2px] origin-top -rotate-45"
                 />
            </div>

            {/* Celebratory Particles when complete */}
             {isComplete && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-brand-purple rounded-full shadow-[0_0_5px_#a855f7]"
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: Math.cos(i * 45 * (Math.PI / 180)) * 25,
                        y: Math.sin(i * 45 * (Math.PI / 180)) * 25,
                        opacity: [1, 0],
                        scale: [1.5, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: Math.random() * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
             )}
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
          className="h-full bg-gradient-to-r from-brand-purple to-pink-500 rounded-full relative shadow-[0_0_15px_rgba(168,85,247,0.6)] overflow-hidden"
        >
          {/* Glossy Shine Animation */}
          <motion.div
            className="absolute top-0 h-full w-12 md:w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] blur-[1px]"
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
                repeatDelay: 0.5
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
