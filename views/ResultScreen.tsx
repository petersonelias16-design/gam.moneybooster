import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CHECKOUT_URL, RESULT_LEVELS } from '../constants';
import { ResultLevel } from '../types';
import Button from '../components/Button';
import { Lock, ShieldCheck, Trophy, Target, Sparkles } from 'lucide-react';
import { playCelebrationSound } from '../utils/audio';

interface ResultScreenProps {
  score: number;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Calculate Level
  const currentLevel: ResultLevel = RESULT_LEVELS.find(
    level => score >= level.minScore && score <= level.maxScore
  ) || RESULT_LEVELS[0];

  const isHighLevel = score > 32;
  const isMidLevel = score > 24 && score <= 32;
  
  // Determine theme colors based on score for dynamic styling
  const themeColor = isHighLevel ? 'emerald' : isMidLevel ? 'amber' : 'blue';
  const glowColor = isHighLevel ? 'rgba(16, 185, 129, 0.4)' : isMidLevel ? 'rgba(251, 191, 36, 0.4)' : 'rgba(59, 130, 246, 0.4)';
  
  // Dynamic Background Gradient for Atmosphere
  const backgroundGradient = isHighLevel 
    ? 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25) 0%, transparent 70%)'
    : isMidLevel 
        ? 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 70%)'
        : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)';

  useEffect(() => {
    // Ensure top of page on load
    window.scrollTo(0, 0);

    // Play Success Fanfare
    const soundTimer = setTimeout(() => {
        playCelebrationSound();
    }, 300);

    // Suspenseful Score Counting Animation
    let currentVal = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
        const remaining = score - currentVal;
        
        if (remaining <= 0) {
            setDisplayScore(score);
            return;
        }

        // Dynamic speed calculation to create suspense
        let step = 1;
        let delay = 30; // Base speed (fast)

        if (remaining > 15) {
            step = Math.ceil(remaining / 5); // Jump faster early on
            delay = 40;
        } else if (remaining > 8) {
            step = 1;
            delay = 60;
        } else if (remaining > 4) {
            step = 1;
            delay = 150; // Slowing down significantly
        } else if (remaining > 1) {
            step = 1;
            delay = 400; // Suspense...
        } else {
            // Last point: Dramatic pause
            step = 1;
            delay = 800; 
        }

        currentVal += step;
        // Clamp to ensure we don't overshoot
        if (currentVal > score) currentVal = score;

        setDisplayScore(currentVal);
        timeoutId = setTimeout(tick, delay);
    };

    // Start counting after a small delay
    timeoutId = setTimeout(tick, 500);

    // Confetti Logic based on score
    const fireConfetti = () => {
      if (isHighLevel) {
        // High Score: Multiple bursts / Fireworks effect
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#10b981', '#fbbf24', '#FFD700'] });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#10b981', '#fbbf24', '#F472B6'] });
        }, 250);
      } else if (isMidLevel) {
        // Medium Score: Standard festive burst
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#fbbf24', '#10b981', '#ffffff'], gravity: 0.8, scalar: 1.2 });
      } else {
        // Low Score: Subtle encouragement
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 }, colors: ['#94a3b8', '#fbbf24'], scalar: 0.8 });
      }
    };

    // Fire confetti slightly after score starts counting
    const confettiTimer = setTimeout(fireConfetti, 1000);

    return () => {
        clearTimeout(soundTimer);
        clearTimeout(timeoutId);
        clearTimeout(confettiTimer);
    };

  }, [score, isHighLevel, isMidLevel]);

  // Floating background icons based on level
  const floatingIcons = isHighLevel 
    ? ['💰', '💎', '🚀', '👑', '✨'] 
    : isMidLevel 
        ? ['⚡', '🔥', '📈', '💵', '🌟']
        : ['💡', '🔍', '🧭', '📚', '🎯'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-20 relative z-10 overflow-hidden">
      
      {/* Dynamic Background Glow Layer */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ opacity: { duration: 1.5 }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        style={{ background: backgroundGradient }}
      />

      {/* Background Floating Particles Specific to Result Level */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {floatingIcons.map((icon, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 300, x: (Math.random() - 0.5) * 200 }}
                animate={{ 
                    opacity: [0, 0.3, 0], 
                    y: -500,
                    x: (Math.random() - 0.5) * 300,
                    rotate: Math.random() * 180 - 90
                }}
                transition={{ 
                    duration: (15 + Math.random() * 10) / (isHighLevel ? 1.5 : 1), // Faster animation for higher scores
                    repeat: Infinity, 
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
                className={`absolute bottom-0 left-1/2 text-4xl md:text-6xl blur-[1px] ${isHighLevel ? 'drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]' : ''}`}
                style={{ left: `${10 + i * 20}%` }}
            >
                {icon}
            </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          boxShadow: [
            `0 0 0px ${glowColor}`,
            `0 0 40px ${glowColor}`,
            `0 0 0px ${glowColor}`
          ]
        }}
        transition={{ 
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: { duration: 0.6, ease: "easeOut" },
            y: { duration: 0.6, ease: "easeOut" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`max-w-lg w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-6 md:p-8 shadow-2xl text-center relative overflow-hidden z-10`}
        style={{ borderColor: isHighLevel ? '#10b981' : isMidLevel ? '#fbbf24' : '#3b82f6' }}
      >
        {/* Decorative glow inside card */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 blur-[80px] pointer-events-none ${isHighLevel ? 'bg-emerald-500/30' : isMidLevel ? 'bg-amber-500/30' : 'bg-blue-500/30'}`}
        ></motion.div>

        {/* New Introduction Text based on Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-slate-200 leading-relaxed"
        >
            <p className="font-medium text-lg">
                🌟 Parabéns! Você completou o Quiz Money Booster. 
            </p>
            <p className="text-sm text-slate-400 mt-2">
                Com base nas suas respostas, você é o tipo de pessoa que está a um passo de mudar completamente sua vida financeira.
            </p>
        </motion.div>

        {/* Badge Animation */}
        <div className="mb-6 flex justify-center relative z-10">
           {isHighLevel && (
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 m-auto w-32 h-32 border-2 border-dashed border-emerald-400/50 rounded-full"
             />
           )}
           <motion.div 
             initial={{ rotate: -180, scale: 0 }}
             animate={{ rotate: 0, scale: 1 }}
             transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
             whileHover={{ scale: 1.1, rotate: 5 }}
             className={`bg-slate-800 p-5 rounded-full ring-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative`}
             style={{ 
               boxShadow: `0 0 30px ${glowColor}`,
               ['--tw-ring-color' as any]: isHighLevel ? '#10b981' : isMidLevel ? '#fbbf24' : '#3b82f6',
               borderColor: isHighLevel ? '#10b981' : isMidLevel ? '#fbbf24' : '#3b82f6'
             } as React.CSSProperties}
            >
             <div className="text-6xl drop-shadow-md select-none">{currentLevel.badgeIcon}</div>
             {isHighLevel && (
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.6 }}
                 className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-lg"
               >
                 <Sparkles size={20} fill="currentColor" />
               </motion.div>
             )}
           </motion.div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className={`text-2xl md:text-3xl font-extrabold mb-2 ${currentLevel.color} drop-shadow-sm`}
        >
          {currentLevel.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-800/60 rounded-xl p-4 mb-6 text-left border border-slate-700 relative overflow-hidden group hover:border-slate-600 transition-colors z-10"
        >
            {/* Subtle progress bar behind representing score */}
            <div className="absolute bottom-0 left-0 h-1 bg-slate-700/50 w-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(displayScore / 40) * 100}%` }}
                  transition={{ duration: 0.2 }} // Fast update to match counter
                  className={`h-full ${score > 30 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]' : score > 20 ? 'bg-yellow-500' : 'bg-blue-500'}`} 
                ></motion.div>
            </div>
            
            <p className="text-slate-300 mb-2 leading-relaxed font-medium text-sm text-center">
                {currentLevel.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-t border-slate-700/50 pt-2 mt-2">
               <div className="flex items-center gap-2">
                   <Trophy className={`w-3 h-3 ${score > 30 ? 'text-yellow-400' : 'text-slate-400'}`} />
                   <span>Score: <span className={`font-bold text-lg ${displayScore === score ? 'text-brand-green animate-pulse' : 'text-white'}`}>{displayScore}</span>/40</span>
               </div>
               <div className="flex items-center gap-1">
                   <Target className="w-3 h-3 text-brand-accent" />
                   <span>Perfil Analisado</span>
               </div>
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-4 relative"
        >
            <div className="absolute -inset-2 bg-brand-gold/10 blur-lg rounded-full"></div>
            <p className="text-sm text-brand-gold font-bold uppercase tracking-widest animate-pulse relative z-10">
                Temos uma oportunidade única para você
            </p>
        </motion.div>

        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          href={CHECKOUT_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full group relative z-20"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-orange-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-300 animate-pulse-slow"></div>
            <Button variant="secondary" fullWidth className="text-lg py-5 md:py-6 relative shadow-xl border-none">
                <div className="flex flex-col items-center leading-tight gap-1 w-full px-2">
                    <span className="drop-shadow-sm font-black uppercase tracking-wide text-center leading-tight">
                        Quero destravar minha liberdade financeira por R$16,99 AGORA! 🚀
                    </span>
                </div>
            </Button>
        </motion.a>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-6 flex flex-col items-center gap-2 text-slate-500 text-xs z-10 relative"
        >
            <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span>Pagamento 100% Seguro via Kiwify</span>
            </div>
            <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Garantia de 7 dias ou seu dinheiro de volta</span>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ResultScreen;