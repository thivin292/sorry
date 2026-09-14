import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';
import { GlowingButterfly } from '../GlowingButterfly.tsx';

interface BottleScreenProps {
  onBottleOpen: () => void;
}

export const BottleScreen: React.FC<BottleScreenProps> = ({ onBottleOpen }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const insidePositions = [
    { left: '32%', top: '42%', rotate: -10, scale: 0.65 },
    { left: '68%', top: '38%', rotate: 15, scale: 0.68 },
    { left: '48%', top: '52%', rotate: 5, scale: 0.58 },
    { left: '62%', top: '64%', rotate: -20, scale: 0.62 },
    { left: '36%', top: '68%', rotate: 20, scale: 0.64 },
  ];

  const handleBottleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onBottleOpen();
    }, 1200);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[100dvh] w-full px-6 py-8 gap-8 md:gap-16 select-none z-20">
      {/* Large Glowing Center Bottle */}
      <motion.div
        id="butterfly-bottle"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleBottleClick}
        className="relative w-56 h-80 sm:w-64 sm:h-96 rounded-4xl glass-card-deep box-glow-bottle border-2 border-white/60 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(236,72,153,0.45)]"
      >
        {/* Cork Stopper with Pop Animation */}
        <motion.div
          animate={isOpen ? { y: -80, rotate: 35, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-8 bg-amber-800/90 rounded-t-lg border border-amber-600 shadow-md flex items-center justify-center"
        >
          <div className="w-16 h-1 bg-amber-600/60 rounded-full" />
        </motion.div>

        {/* Bottle Neck */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/20 border-x-2 border-white/50" />

        {/* Glass reflection highlights */}
        <div className="absolute top-8 left-4 w-4 h-48 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full pointer-events-none" />
        <div className="absolute top-12 right-4 w-2 h-36 bg-gradient-to-b from-white/30 via-white/5 to-transparent rounded-full pointer-events-none" />

        {/* Soft magical fairy dust inside bottle */}
        <div className="absolute inset-0 rounded-4xl bg-radial from-pink-400/20 via-fuchsia-500/15 to-transparent pointer-events-none" />

        {insidePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute z-10 pointer-events-none"
            initial={{ left: position.left, top: position.top }}
            animate={
              isOpen
                ? {
                    left: index % 2 === 0 ? '-35%' : '135%',
                    top: index < 2 ? '-20%' : '115%',
                    opacity: 0,
                  }
                : { left: position.left, top: position.top, opacity: 1 }
            }
            transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
            style={{ transform: `translate(-50%, -50%) rotate(${position.rotate}deg) scale(${position.scale})` }}
          >
            <GlowingButterfly id={`bottle-${index + 1}`} size={56} isFlapping flapSpeed={0.3} />
          </motion.div>
        ))}

        {/* Pulse prompt */}
        {!isOpen && (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute bottom-6 flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-500/30 border border-pink-300/40 text-xs font-handwriting text-pink-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
            <span>Tap to uncork ❤️</span>
          </motion.div>
        )}
      </motion.div>

      {/* Right-side (or below on mobile) romantic copy matching Image 5 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs sm:max-w-sm"
      >
        <h2 className="font-handwriting text-3xl sm:text-4xl text-pink-100 text-glow-pink tracking-wide mb-3">
          {APP_CONFIG.bottle.heading}
        </h2>

        <p className="font-handwriting text-2xl sm:text-3xl text-pink-200/90 tracking-wide mb-4">
          {APP_CONFIG.bottle.altInstruction}
        </p>

        {/* Hand-drawn style decorative arrow */}
        <div className="flex items-center gap-2 text-pink-300/80">
          <svg width="48" height="48" viewBox="0 0 100 100" className="rotate-[-20deg] md:rotate-[-80deg]">
            <path
              d="M 20 20 C 40 40, 60 70, 75 75 M 60 80 L 80 75 L 80 55"
              fill="none"
              stroke="#f472b6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-handwriting text-lg text-pink-300">Open it!</span>
        </div>
      </motion.div>
    </div>
  );
};
