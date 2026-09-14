import React, { useEffect, useState, useRef } from 'react';
import { GlowingButterfly } from './GlowingButterfly.tsx';
import { PageStep, ButterflyItem } from '../types.ts';
import { APP_CONFIG } from '../config.ts';

interface ButterfliesStageProps {
  currentStep: PageStep;
  caughtIds: number[];
  onCatchButterfly: (id: number) => void;
  isBottleOpen?: boolean;
}

export const ButterfliesStage: React.FC<ButterfliesStageProps> = ({
  currentStep,
  caughtIds,
  onCatchButterfly,
  isBottleOpen = false,
}) => {
  // Define the EXACT 5 butterflies with unique personalities and initial positions
  const [positions, setPositions] = useState<
    Array<{ x: number; y: number; vx: number; vy: number; rot: number; scale: number }>
  >([
    { x: 15, y: 20, vx: 0.12, vy: 0.08, rot: -15, scale: 0.95 },
    { x: 82, y: 22, vx: -0.1, vy: 0.11, rot: 20, scale: 1.05 },
    { x: 12, y: 78, vx: 0.15, vy: -0.09, rot: 15, scale: 0.9 },
    { x: 85, y: 80, vx: -0.13, vy: -0.12, rot: -25, scale: 1.0 },
    { x: 50, y: 15, vx: 0.09, vy: 0.14, rot: 5, scale: 0.98 },
  ]);

  const animFrameRef = useRef<number | null>(null);
  const [bottleBounds, setBottleBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (currentStep !== 'catch' && currentStep !== 'bottle') {
      setBottleBounds(null);
      return;
    }

    const updateBottleBounds = () => {
      setBottleBounds(document.getElementById('butterfly-bottle')?.getBoundingClientRect() ?? null);
    };

    const frameId = requestAnimationFrame(updateBottleBounds);
    window.addEventListener('resize', updateBottleBounds);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateBottleBounds);
    };
  }, [currentStep, caughtIds.length, isBottleOpen]);

  // Flight simulation for Screen 4 (Catching Page)
  useEffect(() => {
    if (currentStep !== 'catch') return;

    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      setPositions((prev) =>
        prev.map((b, idx) => {
          // If already caught, it remains at the bottle spot
          if (caughtIds.includes(idx + 1)) {
            return b;
          }

          let nx = b.x + b.vx * dt * 38;
          let ny = b.y + b.vy * dt * 38;
          let nvx = b.vx + (Math.random() - 0.5) * 0.06;
          let nvy = b.vy + (Math.random() - 0.5) * 0.06;

          // Boundary bounce with padding (5% to 90%)
          if (nx < 8) {
            nx = 8;
            nvx = Math.abs(nvx);
          } else if (nx > 88) {
            nx = 88;
            nvx = -Math.abs(nvx);
          }

          if (ny < 12) {
            ny = 12;
            nvy = Math.abs(nvy);
          } else if (ny > 84) {
            ny = 84;
            nvy = -Math.abs(nvy);
          }

          // Speed limit
          const speed = Math.hypot(nvx, nvy);
          if (speed > 0.25) {
            nvx = (nvx / speed) * 0.25;
            nvy = (nvy / speed) * 0.25;
          } else if (speed < 0.1) {
            nvx *= 1.5;
            nvy *= 1.5;
          }

          // Angle based on velocity
          const targetRot = (Math.atan2(nvy, nvx) * 180) / Math.PI + 90;
          const currentRot = b.rot;
          const rotDiff = ((targetRot - currentRot + 540) % 360) - 180;
          const nrot = currentRot + rotDiff * 0.1;

          return {
            x: nx,
            y: ny,
            vx: nvx,
            vy: nvy,
            rot: nrot,
            scale: b.scale,
          };
        })
      );

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [currentStep, caughtIds]);

  if (currentStep === 'bottle') {
    return null;
  }

  // Ambient positions for non-catch screens (Images 1, 2, 3, 5, 6, 7, 8)
  const getButterflyPlacement = (index: number) => {
    const butterflyId = index + 1;
    const isCaught = caughtIds.includes(butterflyId);

    // SCREEN 4: Catch Screen
    if (currentStep === 'catch') {
      if (isCaught) {
        const bottleOffsets = [
          { x: 30, y: 62, scale: 0.4 },
          { x: 68, y: 52, scale: 0.38 },
          { x: 45, y: 42, scale: 0.36 },
          { x: 70, y: 70, scale: 0.42 },
          { x: 32, y: 76, scale: 0.35 },
        ];
        const offset = bottleOffsets[index % bottleOffsets.length];

        if (bottleBounds) {
          return {
            left: `${bottleBounds.left + (bottleBounds.width * offset.x) / 100}px`,
            top: `${bottleBounds.top + (bottleBounds.height * offset.y) / 100}px`,
            transform: `translate(-50%, -50%) scale(${offset.scale}) rotate(${offset.scale * 40}deg)`,
            opacity: 0.9,
            pointerEvents: 'none' as const,
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          };
        }

        return {
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${offset.scale}) rotate(${offset.scale * 40}deg)`,
          opacity: 0.9,
          pointerEvents: 'none' as const,
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        };
      }

      // Flying butterfly to be caught!
      const p = positions[index];
      return {
        left: `${p.x}%`,
        top: `${p.y}%`,
        transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.rot}deg)`,
        opacity: 1,
        pointerEvents: 'auto' as const,
        transition: 'opacity 0.3s ease',
      };
    }

    // SCREEN 5: Bottle Screen (All 5 butterflies inside the glowing bottle in the center)
    if (currentStep === 'bottle') {
      if (isBottleOpen) {
        // When bottle is tapped/opened, they swirl out!
        const burstPositions = [
          { left: '20%', top: '25%', rot: -25, scale: 1 },
          { left: '80%', top: '22%', rot: 30, scale: 1.1 },
          { left: '15%', top: '75%', rot: -10, scale: 0.9 },
          { left: '85%', top: '78%', rot: 25, scale: 0.95 },
          { left: '50%', top: '15%', rot: 5, scale: 1.05 },
        ];
        const bp = burstPositions[index];
        return {
          ...bp,
          transform: `scale(${bp.scale}) rotate(${bp.rot}deg)`,
          opacity: 1,
          pointerEvents: 'none' as const,
          transition: 'all 1.2s cubic-bezier(0.34, 1.2, 0.64, 1)',
        };
      }

      // Inside the centered bottle: matching image 5!
      const insideBottlePositions = [
        { x: 32, y: 42, rot: -10, scale: 0.65 },
        { x: 68, y: 38, rot: 15, scale: 0.68 },
        { x: 48, y: 52, rot: 5, scale: 0.58 },
        { x: 62, y: 64, rot: -20, scale: 0.62 },
        { x: 36, y: 68, rot: 20, scale: 0.64 },
      ];
      const ib = insideBottlePositions[index];

      if (bottleBounds) {
        return {
          left: `${bottleBounds.left + (bottleBounds.width * ib.x) / 100}px`,
          top: `${bottleBounds.top + (bottleBounds.height * ib.y) / 100}px`,
          transform: `translate(-50%, -50%) scale(${ib.scale}) rotate(${ib.rot}deg)`,
          opacity: 1,
          pointerEvents: 'none' as const,
          transition: 'all 0.8s ease',
        };
      }

      return {
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) scale(${ib.scale}) rotate(${ib.rot}deg)`,
        opacity: 1,
        pointerEvents: 'none' as const,
        transition: 'all 0.8s ease',
      };
    }

    // SCREEN 6: Card Screen (Image 6)
    // 4 butterflies in the 4 corners, 1 main gift butterfly in the card center!
    if (currentStep === 'card') {
      const cardPlacements = [
        { left: '8%', top: '54%', rot: -20, scale: 0.9 },
        { left: '88%', top: '28%', rot: 25, scale: 0.95 },
        { left: '86%', top: '88%', rot: -15, scale: 0.9 },
        { left: '12%', top: '18%', rot: 15, scale: 0.85 },
        // The 5th butterfly is the centerpiece inside the gift card!
        { left: '50%', top: '50%', rot: 0, scale: 1.45 },
      ];
      const cp = cardPlacements[index];
      return {
        left: cp.left,
        top: cp.top,
        transform: `translate(-50%, -50%) scale(${cp.scale}) rotate(${cp.rot}deg)`,
        opacity: 1,
        pointerEvents: index === 4 ? ('auto' as const) : ('none' as const),
        transition: 'all 0.8s ease',
      };
    }

    // SCREEN 1, 2, 3, 7, 8: Ambient corner/side placements matching the reference images
    const ambientPlacements = [
      { left: '10%', top: '26%', rot: -18, scale: 0.95 }, // Top-left corner
      { left: '88%', top: '24%', rot: 22, scale: 1.0 },  // Top-right corner
      { left: '9%', top: '82%', rot: 15, scale: 0.85 },   // Bottom-left corner
      { left: '88%', top: '82%', rot: -25, scale: 0.95 }, // Bottom-right corner
      { left: '82%', top: '34%', rot: -15, scale: 0.9 },  // Upper-right accent
    ];

    const ap = ambientPlacements[index % ambientPlacements.length];
    return {
      left: ap.left,
      top: ap.top,
      transform: `translate(-50%, -50%) scale(${ap.scale}) rotate(${ap.rot}deg)`,
      opacity: 0.95,
      pointerEvents: 'none' as const,
      transition: 'all 0.8s ease',
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {APP_CONFIG.butterflies.map((butterfly, idx) => {
        const placement = getButterflyPlacement(idx);
        const isCaught = caughtIds.includes(butterfly.id);

        return (
          <div
            key={butterfly.id}
            id={`butterfly-entity-${butterfly.id}`}
            className="absolute select-none"
            style={placement}
          >
            {/* Catchable target container */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (currentStep === 'catch' && !isCaught) {
                  onCatchButterfly(butterfly.id);
                }
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                if (currentStep === 'catch' && !isCaught) {
                  onCatchButterfly(butterfly.id);
                }
              }}
              className={`relative flex items-center justify-center p-3 cursor-pointer ${
                currentStep === 'catch' && !isCaught
                  ? 'pointer-events-auto hover:scale-115 active:scale-95 transition-transform'
                  : ''
              }`}
              style={{
                // Extra generous touch area for mobile phones
                width: currentStep === 'catch' ? 76 : 56,
                height: currentStep === 'catch' ? 76 : 56,
              }}
            >
              {/* Soft Pulsing Touch Ring on Catch Screen */}
              {currentStep === 'catch' && !isCaught && (
                <div className="absolute inset-1 rounded-full border border-pink-300/40 animate-ping pointer-events-none opacity-40" />
              )}

              <GlowingButterfly
                id={butterfly.id}
                size={idx === 4 && currentStep === 'card' ? 72 : 56}
                isFlapping={true}
                flapSpeed={0.28 + (idx % 3) * 0.05}
                rotation={0}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
