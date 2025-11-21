
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Rocket, TrendingUp, Clock } from 'lucide-react';
import { playSuccessSound } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  
  const handleStart = () => {
     playSuccessSound(); // Initial activation sound
     onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative z-10">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl"
      >
        {/* Atenção Banner */}
        <div className="mb-8 bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <p className="text-xs md:text-sm text-orange-100 font-medium leading-snug">
                <span className="text-orange-400 font-bold text-sm md:text-base mr-1">🔥 ATENÇÃO:</span>
                Você está prestes a descobrir a ferramenta simples que está ajudando pessoas comuns a multiplicarem o dinheiro mesmo sem experiência.
            </p>
        </div>

        <div className="flex justify-center mb-6">
            <div className="relative">
                <div className="absolute inset-0 bg-brand-green blur-xl opacity-30 animate-pulse"></div>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 relative">
                    <Rocket className="w-12 h-12 text-brand-gold" />
                </div>
            </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-white">
          Money Booster
        </h1>

        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
          Pronto para descobrir como transformar <span className="text-brand-gold font-bold">15 minutos por dia</span> em uma revolução financeira? 🚀
        </p>

        <div className="grid grid-cols-1 gap-3 mb-8 text-left">
            <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-brand-accent" />
                <span>Apenas 15 min diários</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-brand-green shrink-0" />
                <span className="italic font-medium text-slate-300">“O impulso que desbloqueia sua vida financeira.”</span>
            </div>
        </div>

        <Button onClick={handleStart} fullWidth variant="primary" className="text-lg">
          COMEÇAR AGORA
        </Button>
        
        <p className="mt-4 text-xs text-orange-300/90 font-medium animate-pulse">
          ⏳ Milhares já estão transformando seu futuro financeiro. Não perca essa oportunidade exclusiva! ❗
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
