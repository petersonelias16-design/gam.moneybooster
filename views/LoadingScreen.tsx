import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Search, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LOADING_STEPS = [
  { text: "Conectando respostas...", icon: Search },
  { text: "Analisando perfil comportamental...", icon: BrainCircuit },
  { text: "Calculando potencial de lucro...", icon: TrendingUp },
  { text: "Verificando estratégias...", icon: ShieldCheck },
  { text: "Gerando plano personalizado...", icon: Zap },
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalDuration = 3500;

  useEffect(() => {
    const stepDuration = totalDuration / LOADING_STEPS.length;

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, stepDuration);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, totalDuration);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  const CurrentIcon = LOADING_STEPS[currentStepIndex].icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center relative z-10 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        {/* Central Animation Container */}
        <div className="relative mb-12 w-32 h-32 flex items-center justify-center">
          {/* Background Pulse */}
          <div className="absolute inset-0 bg-brand-green/10 blur-2xl rounded-full animate-pulse"></div>

          {/* Outer Spinning Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-brand-green/40 border-b-transparent border-l-transparent"
          />
          
          {/* Inner Spinning Ring (Counter-clockwise) */}
          <motion.div 
            animate={{ rotate: -180 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border-b-2 border-l-2 border-brand-gold/30 border-t-transparent border-r-transparent"
          />
          
          {/* Central Icon Container */}
          <div className="relative z-10 p-5 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <CurrentIcon className="w-10 h-10 text-brand-green" />
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
        
        {/* Text Animation */}
        <div className="h-20 flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait">
                <motion.h2 
                    key={currentStepIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2"
                >
                    {LOADING_STEPS[currentStepIndex].text}
                </motion.h2>
            </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-[250px] bg-slate-800/50 rounded-full h-1.5 mt-6 overflow-hidden backdrop-blur-sm border border-slate-700/50 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: totalDuration / 1000, ease: "linear" }}
            className="h-full bg-gradient-to-r from-brand-green via-emerald-400 to-brand-gold relative"
          >
             <div className="absolute inset-0 bg-white/30 w-full h-full animate-[pulse_1s_ease-in-out_infinite]"></div>
          </motion.div>
        </div>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-slate-500 text-[10px] font-mono tracking-[0.2em] uppercase"
        >
            Inteligência Money Booster
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;