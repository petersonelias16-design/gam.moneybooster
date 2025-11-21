
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { playClickSound } from '../utils/audio';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'option';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseStyles = "relative font-bold rounded-xl py-4 px-6 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-emerald-500/30 border-b-4 border-emerald-700 hover:brightness-110",
    secondary: "bg-gradient-to-r from-brand-gold to-amber-300 text-brand-dark shadow-amber-500/30 border-b-4 border-amber-600 hover:brightness-110",
    option: "bg-slate-800 text-slate-100 border-2 border-slate-700 hover:border-brand-green hover:bg-slate-700 text-left justify-start"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
