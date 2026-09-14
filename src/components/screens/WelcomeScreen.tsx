import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 py-8 select-none z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center max-w-sm sm:max-w-md w-full text-center"
      >
        {/* Script Greeting: "Hey Azhagii.. ♡" */}
        <h1 className="font-script text-5xl sm:text-6xl text-pink-100 text-glow-pink tracking-wide leading-tight">
          {APP_CONFIG.welcome.scriptGreeting}
        </h1>

        <p className="font-serif-romantic italic text-lg sm:text-xl text-pink-200/90 -mt-1 mb-5">
          {APP_CONFIG.welcome.heading}
        </p>

        {/* Polaroid Photo Frame with Washi Tape and Floral Accent */}
        <div className="relative my-2">
          {/* Washi Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-400/70 backdrop-blur-sm rounded-xs rotate-[-2deg] z-10 shadow-sm border border-pink-300/40" />

          {/* Polaroid Frame */}
          <motion.div
            whileHover={{ rotate: 1, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-3 pb-6 bg-white/95 rounded-lg shadow-[0_10px_35px_rgba(168,85,247,0.35)] border border-pink-200/50 rotate-[-1deg]"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded bg-pink-100/60 overflow-hidden relative">
              <img
                src={APP_CONFIG.welcome.photoPath}
                alt="Couple Memory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback illustration if image fails
                  const target = e.currentTarget;
                  target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80';
                }}
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Little hearts / caption on polaroid bottom */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-pink-400">
              <Heart className="w-3.5 h-3.5 fill-pink-400" />
              <span className="font-handwriting text-base text-pink-700 tracking-wider">Us Forever</span>
              <Heart className="w-3.5 h-3.5 fill-pink-400" />
            </div>
          </motion.div>

          {/* Delicate Floral Sprig Decal (matching reference image 2) */}
          <div className="absolute -bottom-3 -right-6 pointer-events-none opacity-80 rotate-[15deg]">
            <svg width="45" height="45" viewBox="0 0 100 100" fill="none">
              <path
                d="M 20 85 Q 45 60 70 30"
                stroke="#f472b6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="70" cy="30" r="6" fill="#f43f5e" />
              <circle cx="60" cy="45" r="5" fill="#f472b6" />
              <circle cx="45" cy="58" r="4.5" fill="#e879f9" />
              <circle cx="35" cy="72" r="4" fill="#f472b6" />
            </svg>
          </div>
        </div>

        {/* Romantic Subtitle */}
        <p className="font-handwriting text-xl sm:text-2xl text-pink-100/95 tracking-wide mt-5 mb-7 max-w-xs sm:max-w-sm px-2">
          {APP_CONFIG.welcome.subtitle}
        </p>

        {/* Button: "Let's Continue →" */}
        <motion.button
          id="welcome-continue-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 text-white font-medium text-base shadow-[0_0_25px_rgba(236,72,153,0.6)] border border-pink-300/50 hover:brightness-110 transition-all cursor-pointer"
        >
          <span className="font-serif-romantic tracking-wide">{APP_CONFIG.welcome.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
};
