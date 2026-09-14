import React from 'react';

export const BackgroundElements: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* Base Dreamy Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c084fc]/40 via-[#f472b6]/35 to-[#7e22ce]/50" />
      
      {/* Deep Violet Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,114,182,0.45)_0%,rgba(168,85,247,0.3)_45%,rgba(59,7,100,0.85)_100%)]" />

      {/* Radiant Glowing Orbs (matching reference glowing pink/purple aura) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pink-500/25 blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Glowing Wireframe Constellations & Stars SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-60">
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Delicate dotted star-lines (like in image 1, 3, 5) */}
        <path
          d="M 40 80 Q 120 140 220 100 T 400 180"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <path
          d="M 85 15 Q 75 30 90 45"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
          strokeDasharray="2 5"
        />
        <path
          d="M 15 70 Q 30 85 45 75"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.8"
          strokeDasharray="3 6"
        />

        {/* Twinkling 4-Point Stars */}
        {[
          { x: '12%', y: '18%', size: 14, delay: '0s' },
          { x: '88%', y: '22%', size: 18, delay: '1.2s' },
          { x: '18%', y: '78%', size: 16, delay: '0.6s' },
          { x: '82%', y: '84%', size: 20, delay: '1.8s' },
          { x: '50%', y: '12%', size: 12, delay: '2.1s' },
          { x: '92%', y: '60%', size: 14, delay: '0.9s' },
          { x: '8%', y: '50%', size: 16, delay: '1.5s' },
        ].map((star, i) => (
          <g
            key={i}
            className="animate-sparkle"
            style={{
              transformOrigin: `${star.x} ${star.y}`,
              animationDelay: star.delay,
            }}
          >
            {/* Center glow */}
            <circle cx={star.x} cy={star.y} r={star.size / 2} fill="url(#star-glow)" />
            {/* 4-point sparkle */}
            <path
              d={`M 0 -${star.size} L 0 ${star.size} M -${star.size} 0 L ${star.size} 0`}
              transform={`translate(${Number.parseFloat(star.x)} ${Number.parseFloat(star.y)})`}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      {/* Floating Glowing Ambient Hearts (Outline ♡) from the reference screenshots */}
      <div
        className="absolute top-[28%] left-[8%] text-pink-200/40 text-2xl font-light animate-float pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        style={{ animationDuration: '6s', animationDelay: '0s' }}
      >
        ♡
      </div>
      <div
        className="absolute top-[48%] left-[18%] text-pink-100/35 text-xl font-light animate-float pointer-events-none drop-shadow-[0_0_6px_rgba(244,114,182,0.8)]"
        style={{ animationDuration: '7s', animationDelay: '1.5s' }}
      >
        ♡
      </div>
      <div
        className="absolute top-[35%] right-[14%] text-pink-200/40 text-3xl font-light animate-float pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        style={{ animationDuration: '8s', animationDelay: '2.5s' }}
      >
        ♡
      </div>
      <div
        className="absolute bottom-[24%] right-[10%] text-pink-100/40 text-2xl font-light animate-float pointer-events-none drop-shadow-[0_0_8px_rgba(244,114,182,0.7)]"
        style={{ animationDuration: '6.5s', animationDelay: '3.2s' }}
      >
        ♡
      </div>
      <div
        className="absolute bottom-[18%] left-[28%] text-fuchsia-200/35 text-lg font-light animate-float pointer-events-none drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
        style={{ animationDuration: '9s', animationDelay: '0.8s' }}
      >
        ♡
      </div>
    </div>
  );
};
