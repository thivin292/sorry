import React from 'react';

interface GlowingButterflyProps {
  id?: number | string;
  size?: number; // size in px, default 54
  isFlapping?: boolean;
  flapSpeed?: number; // in seconds, default 0.35s
  glowColor?: string;
  rotation?: number;
  className?: string;
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
  style?: React.CSSProperties;
}

export const GlowingButterfly: React.FC<GlowingButterflyProps> = ({
  id = 'butterfly',
  size = 54,
  isFlapping = true,
  flapSpeed = 0.35,
  glowColor = '#f472b6',
  rotation = 0,
  className = '',
  onClick,
  style,
}) => {
  const filterId = `butterfly-glow-${id}`;
  const gradientId = `butterfly-grad-${id}`;

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none cursor-pointer filter drop-shadow-[0_0_12px_${glowColor}] ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        perspective: '600px',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible pointer-events-auto"
      >
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#e879f9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id={`inner-highlight-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer Glow Aura */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="34"
          fill="url(#gradientId)"
          opacity="0.3"
          filter={`url(#${filterId})`}
        />

        {/* LEFT WING */}
        <g
          className={isFlapping ? 'animate-wing-left' : ''}
          style={{
            transformOrigin: '50px 50px',
            animationDuration: `${flapSpeed}s`,
          }}
        >
          {/* Forewing */}
          <path
            d="M 50 48 C 42 22, 16 10, 8 26 C 2 38, 12 56, 48 52 Z"
            fill={`url(#${gradientId})`}
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeOpacity="0.85"
          />
          {/* Hindwing */}
          <path
            d="M 50 52 C 40 56, 18 56, 16 70 C 14 82, 34 84, 49 60 Z"
            fill={`url(#${gradientId})`}
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeOpacity="0.75"
          />
          {/* Wing Vein Highlights */}
          <path
            d="M 48 48 Q 28 32 16 28 M 48 48 Q 25 44 14 42 M 48 53 Q 32 64 24 74"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.65"
          />
          {/* Wing Edge Sparkle dots */}
          <circle cx="10" cy="27" r="1.5" fill="#ffffff" opacity="0.9" />
          <circle cx="14" cy="20" r="1.2" fill="#ffffff" opacity="0.8" />
          <circle cx="18" cy="74" r="1.3" fill="#ffffff" opacity="0.8" />
        </g>

        {/* RIGHT WING */}
        <g
          className={isFlapping ? 'animate-wing-right' : ''}
          style={{
            transformOrigin: '50px 50px',
            animationDuration: `${flapSpeed}s`,
          }}
        >
          {/* Forewing */}
          <path
            d="M 50 48 C 58 22, 84 10, 92 26 C 98 38, 88 56, 52 52 Z"
            fill={`url(#${gradientId})`}
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeOpacity="0.85"
          />
          {/* Hindwing */}
          <path
            d="M 50 52 C 60 56, 82 56, 84 70 C 86 82, 66 84, 51 60 Z"
            fill={`url(#${gradientId})`}
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeOpacity="0.75"
          />
          {/* Wing Vein Highlights */}
          <path
            d="M 52 48 Q 72 32 84 28 M 52 48 Q 75 44 86 42 M 52 53 Q 68 64 76 74"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.65"
          />
          {/* Wing Edge Sparkle dots */}
          <circle cx="90" cy="27" r="1.5" fill="#ffffff" opacity="0.9" />
          <circle cx="86" cy="20" r="1.2" fill="#ffffff" opacity="0.8" />
          <circle cx="82" cy="74" r="1.3" fill="#ffffff" opacity="0.8" />
        </g>

        {/* BUTTERFLY BODY & HEAD */}
        <ellipse cx="50" cy="52" rx="2.5" ry="12" fill="#4c0519" stroke="#ffffff" strokeWidth="0.4" />
        <ellipse cx="50" cy="50" rx="1.8" ry="10" fill="#a21caf" />
        <circle cx="50" cy="38" r="2.8" fill="#581c87" stroke="#ffffff" strokeWidth="0.4" />

        {/* ANTENNAE */}
        <path
          d="M 49 37 Q 44 26 38 24 M 51 37 Q 56 26 62 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <circle cx="38" cy="24" r="1" fill="#ffffff" />
        <circle cx="62" cy="24" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
};
