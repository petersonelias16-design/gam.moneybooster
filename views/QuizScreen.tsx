
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { QUESTIONS, SOCIAL_PROOFS } from '../constants';
import { Option } from '../types';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import SocialProofBubble from '../components/SocialProofBubble';
import { CheckCircle2 } from 'lucide-react';
import { playSuccessSound } from '../utils/audio';

interface QuizScreenProps {
  onComplete: (score: number) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSocialProofIndex, setActiveSocialProofIndex] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];
  // Adjusted calculation: Starts at 10% (Question 1) and reaches 100% (Question 10)
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleOptionSelect = (option: Option) => {
    if (isTransitioning) return; 
    
    setIsTransitioning(true);
    setSelectedOption(option.id);
    
    // Play Audio Feedback (Updated to Chime)
    playSuccessSound();

    // Small Confetti Burst for Instant Gratification
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#10b981', '#fbbf24'],
      disableForReducedMotion: true,
      ticks: 100,
      gravity: 1.2,
      scalar: 0.7
    });

    const newScore = currentScore + option.score;
    setCurrentScore(newScore);

    // Haptic vibration
    if (navigator.vibrate) navigator.vibrate(50);

    // Check for Social Proof Trigger
    const socialProofItem = SOCIAL_PROOFS.find(sp => sp.triggerAfterQuestionIndex === currentIndex);

    // Flow logic
    setTimeout(() => {
      if (socialProofItem) {
        // Show Social Proof Bubble
        setActiveSocialProofIndex(currentIndex);
        
        // Wait for bubble duration then move next
        setTimeout(() => {
            setActiveSocialProofIndex(null);
            moveToNextOrFinish(newScore);
        }, 2500); // Display duration for social proof

      } else {
        // No social proof, move immediately
        moveToNextOrFinish(newScore);
      }
    }, 800); // Slightly longer delay to enjoy the confetti/sound
  };

  const moveToNextOrFinish = (finalScore: number) => {
    if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
    } else {
        finishQuiz(finalScore);
    }
  };

  const finishQuiz = (finalScore: number) => {
    // Final big explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#fbbf24', '#ffffff']
    });
    onComplete(finalScore);
  };

  const currentSocialProof = activeSocialProofIndex !== null 
    ? SOCIAL_PROOFS.find(sp => sp.triggerAfterQuestionIndex === activeSocialProofIndex) 
    : null;

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full min-h-screen p-4 pt-10 relative z-10">
      
      {/* Social Proof Overlay */}
      <AnimatePresence>
        {currentSocialProof && (
            <SocialProofBubble key="social-proof" data={currentSocialProof} />
        )}
      </AnimatePresence>

      {/* Progress Header */}
      <div className="w-full mb-8 space-y-1 mt-4">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            <span>Evolução</span>
            <span>{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`w-full ${activeSocialProofIndex !== null ? 'blur-sm transition-all duration-500 pointer-events-none opacity-50' : ''}`}
        >
          {/* Question Card */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
              <span className="text-brand-green mr-2">#{currentIndex + 1}</span>
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option: Option) => {
                const isSelected = selectedOption === option.id;
                
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Button
                        variant="option"
                        fullWidth
                        onClick={() => handleOptionSelect(option)}
                        className={`${isSelected ? 'ring-2 ring-brand-gold bg-slate-700 scale-[1.02]' : ''}`}
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{option.emoji}</span>
                                <span className="font-medium text-base md:text-lg">{option.text}</span>
                            </div>
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <CheckCircle2 className="w-6 h-6 text-brand-green" />
                                </motion.div>
                            )}
                        </div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizScreen;
