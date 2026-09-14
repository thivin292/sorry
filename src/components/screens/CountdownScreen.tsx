import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface CountdownScreenProps {
  onCountdownComplete: () => void;
  onUserInteraction: () => void;
  hasInteracted: boolean;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({
  onCountdownComplete,
  onUserInteraction,
  hasInteracted,
}) => {
  const [count, setCount] = useState<number>(3);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const startCountdown = () => {
    onUserInteraction();
    setIsCounting(true);
  };

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (!isCounting) return;

    if (count > 1) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 1) {
      const timer = setTimeout(() => {
        onCountdownComplete();
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [isCounting, count, onCountdownComplete]);

  return (
    <div
      onClick={() => {
        if (!isCounting) startCountdown();
      }}
      className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 select-none cursor-pointer z-20"
    >
      {/* Top Heading: "Are you ready? ♡" */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-pink-100 text-glow-pink tracking-wide">
          {APP_CONFIG.countdown.topHeading}
        </h1>
      </motion.div>

      {/* Glowing Glass Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl glass-card-deep box-glow-pink flex flex-col items-center justify-between p-6 sm:p-8"
      >
        {/* Soft Ambient Inner Glow */}
        <div className="absolute inset-0 rounded-3xl bg-radial from-pink-400/20 via-transparent to-transparent pointer-events-none" />

        {/* Small top decorative spacer */}
        <div className="h-4" />

        {/* Big Juicy Glossy Number */}
        <div className="relative flex items-center justify-center flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.3, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-serif-romantic text-8xl sm:text-9xl font-bold text-pink-100 drop-shadow-[0_4px_16px_rgba(236,72,153,0.8)] filter"
              style={{
                textShadow:
                  '0 0 20px #f472b6, 0 0 40px #ec4899, 0 0 60px #c084fc',
              }}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle & Heart */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-handwriting text-2xl sm:text-3xl text-pink-200 tracking-wide">
            {APP_CONFIG.countdown.bottomSubtitle}
          </p>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-5 h-5 text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};
