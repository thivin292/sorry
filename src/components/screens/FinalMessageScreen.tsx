import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../../config.ts';

interface FinalMessageScreenProps {
  onRestart: () => void;
}

export const FinalMessageScreen: React.FC<FinalMessageScreenProps> = ({ onRestart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 py-8 sm:py-12 select-none z-20 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-md sm:max-w-lg w-full p-6 sm:p-9 rounded-3xl glass-card-deep box-glow-pink border-2 border-white/45 text-center shadow-[0_0_50px_rgba(236,72,153,0.4)] my-auto"
      >
        {/* Soft Ambient Inner Glow */}
        <div className="absolute inset-0 rounded-3xl bg-radial from-pink-400/20 via-transparent to-transparent pointer-events-none" />

        {/* Header: "I'm Sorry... ♡" */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl text-pink-100 text-glow-pink tracking-wide mb-6 flex items-center justify-center gap-2"
        >
          <span>{APP_CONFIG.finalMessage.title}</span>
        </motion.h1>

        {/* Heartfelt Paragraphs with Emotional Typography */}
        <div className="space-y-4 text-left sm:text-center text-pink-100/95 font-handwriting text-xl sm:text-2xl leading-relaxed">
          <p className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Sorry for the moments when I hurt you, misunderstood you, or made you feel bad.
          </p>

          <p className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            I know saying sorry can't change those moments, but I genuinely mean it. ❤️
          </p>

          <div className="py-1">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300/40 to-transparent mx-auto" />
          </div>

          <p className="italic text-pink-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] whitespace-pre-line">
            Ivlo naal nee illaama irundhadhukku apram…
            <br />
            Nee thirumbi vandhuta nu nenachale romba happy-ah irukku. 🥹❤️
          </p>

          <p className="text-pink-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] whitespace-pre-line">
            Welcome back, en azhagana loosu. 😂❤️
            <br />
            Unna miss pannadhu… naan nenachadha vida romba adhigam. 🥹❤️
          </p>

          <div className="py-1">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300/40 to-transparent mx-auto" />
          </div>

          <p className="font-semibold text-pink-100 text-2xl sm:text-3xl text-glow-pink">
            And honestly… I’m just really happy that you’re back. ❤️
          </p>
        </div>

        {/* Closing Line Pill (matching reference image 8) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="px-6 py-2.5 rounded-full bg-white/20 border border-white/40 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center gap-2">
            <span className="font-handwriting text-xl sm:text-2xl text-pink-100">
              {APP_CONFIG.finalMessage.closingLineAlternative}
            </span>
          </div>

          {/* Replay / Restart Journey button */}
          <button
            id="final-restart-journey-btn"
            onClick={onRestart}
            className="flex items-center gap-1.5 text-xs text-pink-200/80 hover:text-pink-100 transition-colors pt-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Experience from Start</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
