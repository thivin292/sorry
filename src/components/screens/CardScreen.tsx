import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface CardScreenProps {
  onCardOpen: () => void;
}

export const CardScreen: React.FC<CardScreenProps> = ({ onCardOpen }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onCardOpen();
    }, 700);
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 select-none cursor-pointer z-20"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
        animate={{
          scale: isOpening ? 1.15 : 1,
          opacity: isOpening ? 0 : 1,
          rotate: isOpening ? 5 : 0,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.5 }}
        className="relative w-72 h-84 sm:w-80 sm:h-96 rounded-3xl glass-card-deep box-glow-pink border-2 border-white/55 flex flex-col items-center justify-between p-6 sm:p-8 shadow-[0_0_50px_rgba(236,72,153,0.5)]"
      >
        {/* Soft Glass Highlights */}
        <div className="absolute inset-0 rounded-3xl bg-radial from-pink-400/20 via-transparent to-transparent pointer-events-none" />

        {/* Card Header Text */}
        <div className="text-center pt-2">
          <p className="font-handwriting text-2xl sm:text-3xl text-pink-100 tracking-wide">
            {APP_CONFIG.card.giftText}
          </p>
        </div>

        {/* Center Space for the 5th Centerpiece Butterfly */}
        <div className="relative flex items-center justify-center w-full h-36">
          {/* Subtle luminous halo */}
          <div className="w-32 h-32 rounded-full bg-pink-400/25 blur-2xl animate-pulse pointer-events-none" />
        </div>

        {/* Tap to open copy */}
        <div className="flex items-center gap-2 pb-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-pink-100">
            {APP_CONFIG.card.tapText}
          </span>
          <Heart className="w-4 h-4 text-fuchsia-300 fill-fuchsia-300" />
        </div>
      </motion.div>
    </div>
  );
};
