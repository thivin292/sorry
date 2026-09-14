import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleDigitClick = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      if (newPin === APP_CONFIG.passcode) {
        // Correct pin!
        setTimeout(() => {
          onUnlock();
        }, 300);
      } else {
        // Wrong pin!
        setIsError(true);
        setShowHint(true);
        setTimeout(() => {
          setPin('');
          setIsError(false);
        }, 700);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setIsError(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 py-6 select-none z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-xs sm:max-w-sm w-full"
      >
        {/* Top Glowing Lock Circle */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full glass-card-deep box-glow-pink flex items-center justify-center border border-pink-300/60">
            <div className="relative">
              <Lock className="w-7 h-7 text-pink-300 stroke-[2.2]" />
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 absolute top-2.5 left-1/2 -translate-x-1/2" />
            </div>
          </div>
          {/* Subtle Outer Ring Glow */}
          <div className="absolute inset-0 rounded-full border border-pink-400/30 animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Heading: "Enter Passkey" */}
        <h2 className="font-script text-4xl sm:text-5xl text-pink-100 text-glow-pink tracking-wide mb-5">
          Enter Passkey
        </h2>

        {/* 4 Passcode Dots */}
        <motion.div
          animate={isError ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-7"
        >
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pin.length;
            return (
              <motion.div
                key={index}
                animate={{
                  scale: isFilled ? 1.15 : 1,
                  backgroundColor: isError
                    ? 'rgba(244, 63, 94, 0.9)'
                    : isFilled
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'transparent',
                }}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white/80 ${
                  isFilled ? 'shadow-[0_0_12px_rgba(255,255,255,0.8)]' : ''
                }`}
              />
            );
          })}
        </motion.div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3.5 sm:gap-4.5 w-full px-2 sm:px-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <motion.button
              key={digit}
              id={`keypad-digit-${digit}`}
              whileHover={{ scale: 1.06, backgroundColor: 'rgba(255, 255, 255, 0.28)' }}
              whileTap={{ scale: 0.92, backgroundColor: 'rgba(244, 114, 182, 0.5)' }}
              onClick={() => handleDigitClick(digit)}
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full glass-panel flex items-center justify-center text-xl sm:text-2xl font-serif-romantic text-white border border-white/35 shadow-[0_4px_15px_rgba(0,0,0,0.15)] cursor-pointer"
            >
              {digit}
            </motion.button>
          ))}

          {/* Empty spacer on left of 0 */}
          <div className="w-14 h-14 sm:w-16 sm:h-16" />

          {/* 0 digit */}
          <motion.button
            id="keypad-digit-0"
            whileHover={{ scale: 1.06, backgroundColor: 'rgba(255, 255, 255, 0.28)' }}
            whileTap={{ scale: 0.92, backgroundColor: 'rgba(244, 114, 182, 0.5)' }}
            onClick={() => handleDigitClick('0')}
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full glass-panel flex items-center justify-center text-xl sm:text-2xl font-serif-romantic text-white border border-white/35 shadow-[0_4px_15px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            0
          </motion.button>

          {/* Clear button */}
          <motion.button
            id="keypad-clear-btn"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleClear}
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full glass-panel flex items-center justify-center text-xs sm:text-sm font-handwriting text-pink-200 border border-white/25 hover:bg-white/20 cursor-pointer"
          >
            Clear
          </motion.button>
        </div>

        {/* Hint text at bottom right or centered (shown always or on error) */}
        <div className="mt-5 text-right w-full pr-4">
          <p
            className={`font-handwriting text-lg sm:text-xl transition-all ${
              showHint ? 'text-pink-300 font-semibold drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]' : 'text-pink-200/70'
            }`}
          >
            {APP_CONFIG.passcodeHint}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
