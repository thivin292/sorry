import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageStep } from './types.ts';
import { APP_CONFIG } from './config.ts';
import { BackgroundElements } from './components/BackgroundElements.tsx';
import { ButterfliesStage } from './components/ButterfliesStage.tsx';
import { AudioController } from './components/AudioController.tsx';
import { CountdownScreen } from './components/screens/CountdownScreen.tsx';
import { WelcomeScreen } from './components/screens/WelcomeScreen.tsx';
import { LockScreen } from './components/screens/LockScreen.tsx';
import { CatchButterfliesScreen } from './components/screens/CatchButterfliesScreen.tsx';
import { BottleScreen } from './components/screens/BottleScreen.tsx';
import { CardScreen } from './components/screens/CardScreen.tsx';
import { ForgiveScreen } from './components/screens/ForgiveScreen.tsx';
import { FinalMessageScreen } from './components/screens/FinalMessageScreen.tsx';

export default function App() {
  const [currentStep, setCurrentStep] = useState<PageStep>('countdown');
  const [hasMusicStarted, setHasMusicStarted] = useState<boolean>(true);
  const [caughtIds, setCaughtIds] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isBottleOpen, setIsBottleOpen] = useState<boolean>(false);

  // Trigger music on first user interaction
  const handleUserInteraction = () => {
    if (!hasMusicStarted) {
      setHasMusicStarted(true);
    }
  };

  // Step 1 -> Step 2
  const handleCountdownComplete = () => {
    setCurrentStep('welcome');
  };

  // Step 2 -> Step 3
  const handleWelcomeContinue = () => {
    setCurrentStep('lock');
  };

  // Step 3 -> Step 4
  const handleLockUnlock = () => {
    setCurrentStep('catch');
  };

  // Step 4: Catch butterflies
  const handleCatchButterfly = (id: number) => {
    if (caughtIds.includes(id)) return;

    const newCaught = [...caughtIds, id];
    setCaughtIds(newCaught);

    // Get message matching order of caught: 1st caught -> Text 1, 2nd -> Text 2, etc.
    const messageIndex = newCaught.length - 1;
    const butterflyConfig = APP_CONFIG.butterflies[messageIndex] || APP_CONFIG.butterflies[0];
    setCurrentMessage(butterflyConfig.message);

  };

  const handleDismissMessage = () => {
    setCurrentMessage(null);
    if (caughtIds.length === 5 && currentStep === 'catch') {
      setCurrentStep('bottle');
    }
  };

  // Step 5 -> Step 6
  const handleBottleOpen = () => {
    setIsBottleOpen(true);
    setTimeout(() => {
      setCurrentStep('card');
    }, 900);
  };

  // Step 6 -> Step 7
  const handleCardOpen = () => {
    setCurrentStep('forgive');
  };

  // Step 7 -> Step 8
  const handleForgiveYes = () => {
    setCurrentStep('final');
  };

  // Restart experience
  const handleRestart = () => {
    setCaughtIds([]);
    setCurrentMessage(null);
    setIsBottleOpen(false);
    setCurrentStep('countdown');
  };

  return (
    <main
      className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col items-center justify-center font-sans"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Dreamy Ambient Pink-Purple Background */}
      <BackgroundElements />

      {/* Global Background Audio Player & Settings (Section loop 45s-60s) */}
      <AudioController
        hasStarted={hasMusicStarted}
        onUserTriggerStart={handleUserInteraction}
      />

      {/* EXACT 5 Butterflies Stage (Consistent across all pages) */}
      <ButterfliesStage
        currentStep={currentStep}
        caughtIds={caughtIds}
        onCatchButterfly={handleCatchButterfly}
        isBottleOpen={isBottleOpen}
      />

      {/* Interactive Flow Screens */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CountdownScreen
                onCountdownComplete={handleCountdownComplete}
                onUserInteraction={handleUserInteraction}
                hasInteracted={hasMusicStarted}
              />
            </motion.div>
          )}

          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <WelcomeScreen onNext={handleWelcomeContinue} />
            </motion.div>
          )}

          {currentStep === 'lock' && (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LockScreen onUnlock={handleLockUnlock} />
            </motion.div>
          )}

          {currentStep === 'catch' && (
            <motion.div
              key="catch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CatchButterfliesScreen
                caughtCount={caughtIds.length}
                currentMessage={currentMessage}
                onDismissMessage={handleDismissMessage}
              />
            </motion.div>
          )}

          {currentStep === 'bottle' && (
            <motion.div
              key="bottle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <BottleScreen onBottleOpen={handleBottleOpen} />
            </motion.div>
          )}

          {currentStep === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CardScreen onCardOpen={handleCardOpen} />
            </motion.div>
          )}

          {currentStep === 'forgive' && (
            <motion.div
              key="forgive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ForgiveScreen onYes={handleForgiveYes} />
            </motion.div>
          )}

          {currentStep === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <FinalMessageScreen onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
