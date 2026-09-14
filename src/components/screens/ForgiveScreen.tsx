import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface ForgiveScreenProps {
  onYes: () => void;
}

export const ForgiveScreen: React.FC<ForgiveScreenProps> = ({ onYes }) => {
  // Coordinates for the playful runaway "No" button
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState<number>(0);

  const handleDodge = () => {
    // Generate random offsets that keep the button within reasonable screen bounds
    const angles = [45, 135, 225, 315, 90, 270, 0, 180];
    const angle = angles[Math.floor(Math.random() * angles.length)] * (Math.PI / 180);
    const distance = 80 + Math.random() * 60;

    let nx = Math.cos(angle) * distance;
    let ny = Math.sin(angle) * distance;

    // Clamp inside viewport
    if (Math.abs(nx) > 130) nx = Math.sign(nx) * 110;
    if (Math.abs(ny) > 120) ny = Math.sign(ny) * 90;

    setNoOffset({ x: nx, y: ny });
    setDodgeCount((prev) => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 select-none z-20">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-sm sm:max-w-md p-7 sm:p-9 rounded-3xl glass-card-deep box-glow-pink border-2 border-white/50 text-center shadow-[0_0_40px_rgba(236,72,153,0.4)]"
      >
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 rounded-3xl bg-radial from-pink-400/20 via-transparent to-transparent pointer-events-none" />

        {/* Question: "Will you forgive me? 🥺❤️" */}
        <h2 className="font-script text-4xl sm:text-5xl text-pink-100 text-glow-pink tracking-wide mb-8 flex items-center justify-center gap-2 flex-wrap">
          <span>{APP_CONFIG.forgive.question}</span>
        </h2>

        {/* Buttons Container */}
        <div className="relative flex items-center justify-center gap-4 sm:gap-6 min-h-[70px]">
          {/* YES BUTTON (Glowing Pink Pill) */}
          <motion.button
            id="forgive-yes-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={onYes}
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 text-white font-serif-romantic text-xl font-semibold shadow-[0_0_25px_rgba(236,72,153,0.7)] border-2 border-pink-200/60 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{APP_CONFIG.forgive.yesBtn}</span>
          </motion.button>

          {/* NO BUTTON (Playful Runaway Button) */}
          <motion.button
            id="forgive-no-btn"
            animate={{ x: noOffset.x, y: noOffset.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            onMouseEnter={handleDodge}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDodge();
            }}
            onClick={(e) => {
              e.preventDefault();
              handleDodge();
            }}
            className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-purple-900/60 text-pink-200/90 font-serif-romantic text-xl border border-white/25 hover:bg-purple-800/70 shadow-md cursor-pointer select-none"
          >
            <span>{APP_CONFIG.forgive.noBtn}</span>
          </motion.button>
        </div>

        {/* Playful Hand-Drawn Arrow & Annotation Note (from image 7) */}
        <div className="relative mt-7 flex flex-col items-end pr-2 text-right">
          <div className="flex items-center gap-2 text-pink-200">
            <svg
              width="36"
              height="36"
              viewBox="0 0 100 100"
              className="text-pink-300 rotate-[-10deg]"
            >
              <path
                d="M 60 20 Q 30 50 45 80 M 35 65 L 45 80 L 60 70"
                fill="none"
                stroke="#f472b6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />
            </svg>
            <div className="text-left font-handwriting text-lg sm:text-xl text-pink-200 leading-tight drop-shadow">
              <p>No?</p>
              <p>Come on...</p>
              <p>You can't say no ♡</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
