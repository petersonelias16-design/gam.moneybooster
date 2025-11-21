import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { SocialProof } from '../constants';

interface SocialProofBubbleProps {
  data: SocialProof;
}

const SocialProofBubble: React.FC<SocialProofBubbleProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="fixed top-24 left-4 right-4 md:top-auto md:bottom-32 md:left-auto md:right-10 md:w-80 z-50 pointer-events-none"
    >
      <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/50 flex items-start gap-3 relative overflow-hidden">
        {/* Highlight bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-green"></div>
        
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full ${data.avatarColor} flex items-center justify-center text-white font-bold shrink-0 shadow-md`}>
          {data.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-sm text-slate-800">{data.name}</h4>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
               Agora <CheckCircle2 className="w-3 h-3 text-blue-500" />
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-snug font-medium">"{data.message}"</p>
          
          {data.amount && (
             <div className="mt-2 inline-flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Resultado: {data.amount}</span>
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SocialProofBubble;