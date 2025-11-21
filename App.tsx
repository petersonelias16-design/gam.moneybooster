import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from './types';
import WelcomeScreen from './views/WelcomeScreen';
import QuizScreen from './views/QuizScreen';
import LoadingScreen from './views/LoadingScreen';
import ResultScreen from './views/ResultScreen';
import Particles from './components/Particles';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [score, setScore] = useState<number>(0);

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameState('calculating');
  };

  const renderScreen = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setGameState('quiz')} />;
      case 'quiz':
        return <QuizScreen onComplete={handleQuizComplete} />;
      case 'calculating':
        return <LoadingScreen onFinished={() => setGameState('result')} />;
      case 'result':
        return <ResultScreen score={score} />;
      default:
        return <WelcomeScreen onStart={() => setGameState('quiz')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white selection:bg-brand-green selection:text-black font-sans overflow-x-hidden relative">
      <Particles />
      
      <div className="max-w-screen-sm mx-auto w-full relative z-10 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1] // Custom ease (Out-Quart) for premium feel
            }}
            className="w-full flex-grow flex flex-col"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer / Legal text small */}
      <div className="fixed bottom-2 w-full text-center pointer-events-none z-0 opacity-30">
        <p className="text-[10px] text-slate-500">Money Booster © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default App;