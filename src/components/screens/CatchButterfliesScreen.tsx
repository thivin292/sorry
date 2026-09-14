import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface CatchButterfliesScreenProps {
  caughtCount: number;
  currentMessage: string | null;
  onDismissMessage: () => void;
}

export const CatchButterfliesScreen: React.FC<CatchButterfliesScreenProps> = ({
  caughtCount,
  currentMessage,
  onDismissMessage,
}) => {
  return (
    <div
      onClick={onDismissMessage}
      className="relative flex flex-col justify-between min-h-[100dvh] w-full p-4 sm:p-6 select-none z-20"
    >
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-2 sm:pt-4 pointer-events-none"
      >
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-pink-100 text-glow-pink tracking-wide flex items-center justify-center gap-2">
          <span>Catch the butterflies</span>
          <span className="text-3xl sm:text-4xl">🦋</span>
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-pink-200/90 tracking-wide mt-1">
          Catch them all... each one has something to tell you ♡
        </p>
      </motion.div>

      {/* Center Message Card (Shows when a butterfly is caught) */}
      <div className="relative flex-1 flex items-center justify-center px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative max-w-sm sm:max-w-md w-full p-5 sm:p-7 rounded-3xl glass-card-deep box-glow-pink text-center pointer-events-auto border border-white/40 shadow-2xl"
              onClick={(e) => {
                // Clicking inside the bubble doesn't close it, allowing the user to read peacefully
                e.stopPropagation();
              }}
            >
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-100 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {currentMessage}
              </p>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-pink-300/80 text-xs">
                <span>(Tap screen or catch next butterfly)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar: Progress on Left, Glowing Bottle Preview on Right */}
      <div className="flex items-end justify-between w-full pb-2 sm:pb-4 pointer-events-none">
        {/* Progress Counter (matching image 4) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-handwriting text-2xl sm:text-3xl text-pink-100 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
        >
          Butterflies caught: {caughtCount} / 5
        </motion.div>

        {/* Mini Glowing Bottle at Bottom Right */}
        <motion.div
          id="butterfly-bottle"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-24 h-36 sm:w-28 sm:h-40 rounded-3xl glass-panel box-glow-bottle border-2 border-white/50 flex flex-col items-center justify-end p-2 overflow-hidden shadow-2xl"
        >
          {/* Cork stopper at top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-amber-800/80 rounded-t-sm border border-amber-600/60 shadow" />

          {/* Bottle neck */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 border-x border-white/40 bg-white/10" />

          {/* Liquid / magical glow base */}
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-pink-500/30 to-transparent rounded-b-2xl pointer-events-none" />

          {/* Subtle inside label */}
          <div className="text-[11px] font-handwriting text-pink-200/70 pb-1">
            {caughtCount === 5 ? 'Full! ❤️' : `${caughtCount}/5 inside`}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
