
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Rocket, CheckCircle2, ShieldAlert, Zap, TrendingUp } from 'lucide-react';
import { playStartSound } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  
  const handleStart = () => {
     playStartSound(); // New energetic sound
     onStart();
  };

  const benefits = [
    "Sensação de controle imediato sobre seu dinheiro",
    "Alívio das preocupações financeiras",
    "Crescimento real, consistente e medido",
    "Avanço diário como um “booster” de progresso"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center relative z-10">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden"
      >
        {/* 1. ALERTA IMPORTANTE */}
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-4 text-left">
            <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-yellow-100 font-medium leading-snug">
                    <span className="text-yellow-400 font-bold block mb-1 uppercase tracking-wide">⚠️ ALERTA IMPORTANTE</span>
                    O que você está prestes a iniciar tem ajudado pessoas comuns a desbloquearem resultados financeiros que nunca imaginaram — mesmo começando do zero.
                </p>
            </div>
        </div>

        <div className="p-6 md:p-8">
            {/* 2. HEADER & HEADLINE */}
            <div className="mb-6">
                <div className="flex justify-center mb-4">
                     <div className="relative">
                        <div className="absolute inset-0 bg-brand-purple blur-xl opacity-40 animate-pulse"></div>
                        <Rocket className="w-12 h-12 text-brand-purple relative z-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                     </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-black mb-2 text-white tracking-tight">
                  💸 Money Booster
                </h1>
                <p className="text-lg text-brand-green font-semibold">
                    Ative agora o impulso que transforma sua vida financeira.
                </p>
            </div>

            {/* 3. INTRO TEXT */}
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
                Você está pronto para descobrir como <span className="text-brand-gold font-bold">15 minutos por dia</span> podem acelerar sua renda, organizar seus gastos e multiplicar seu dinheiro — tudo de um jeito simples e irresistível?<br/><br/>
                <span className="text-white font-medium">Prepare-se. Isso muda o jogo. 🚀</span>
            </p>

            {/* 4. BULLET POINTS (BENEFITS) */}
            <div className="bg-slate-800/50 rounded-xl p-5 mb-8 text-left border border-slate-700/50">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-2">
                    <Zap className="w-4 h-4 text-brand-gold" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                        ✨ Seus 15 minutos diários podem liberar:
                    </h3>
                </div>
                <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 5. QUOTE */}
            <blockquote className="border-l-4 border-brand-purple pl-4 text-left italic text-slate-400 text-sm mb-8 bg-brand-purple/5 py-2 pr-2 rounded-r-lg">
                “É o empurrão que faltava para destravar sua evolução financeira.”
            </blockquote>

            {/* 6. CTA PRINCIPAL */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-pink-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-200 animate-pulse"></div>
                <Button onClick={handleStart} fullWidth variant="primary" className="text-lg relative z-10 bg-gradient-to-r from-brand-purple to-pink-600 border-pink-800 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:brightness-110">
                  🚀 COMEÇAR AGORA
                </Button>
            </div>
            
            {/* 7. RODAPÉ (URGÊNCIA) */}
            <div className="mt-8 pt-4 border-t border-slate-800 text-center space-y-2">
                <p className="text-[10px] md:text-xs text-orange-400 font-bold uppercase tracking-wider">
                   ⏳ Atenção:
                </p>
                <p className="text-[11px] text-slate-400 leading-snug">
                    Milhares de pessoas já iniciaram essa jornada nas últimas horas.
                    As vagas para este diagnóstico interativo são limitadas e podem fechar a qualquer momento.
                </p>
                <p className="text-xs font-bold text-red-400 animate-pulse">
                    Não deixe para depois. O seu futuro financeiro depende de um clique. ❗
                </p>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
