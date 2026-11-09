'use client';

import React from 'react';

interface ChameleonLogoProps {
  size?: number;
  className?: string;
}

export const ChameleonLogo: React.FC<ChameleonLogoProps> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        {/* Tail Spiral Gradient */}
        <linearGradient id="chamTail" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="70%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        {/* Body Gradient */}
        <linearGradient id="chamBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="25%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="75%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Back Crest Gradient */}
        <linearGradient id="chamCrest" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      {/* Chameleon Tail Spiral */}
      <path
        d="M 32 72 C 22 72 14 64 14 54 C 14 44 22 36 32 36 C 42 36 48 44 48 52 C 48 58 44 62 38 62 C 34 62 30 58 30 54 C 30 50 34 46 38 46"
        stroke="url(#chamTail)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Chameleon Main Body */}
      <path
        d="M 32 40 C 44 26 66 24 76 34 C 84 42 88 56 82 66 C 76 76 60 78 48 76 C 40 74 34 68 32 60 Z"
        fill="url(#chamBody)"
      />

      {/* Spikes / Crest on Back */}
      <path d="M 46 30 L 48 24 L 52 29" stroke="url(#chamCrest)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 54 26 L 57 20 L 61 25" stroke="url(#chamCrest)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 63 24 L 67 18 L 71 24" stroke="url(#chamCrest)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 72 26 L 76 21 L 80 27" stroke="url(#chamCrest)" strokeWidth="3" strokeLinecap="round" />

      {/* Chameleon Eye (Outer Ring) */}
      <circle cx="70" cy="46" r="11" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2.5" />
      {/* Eye Middle Iris */}
      <circle cx="71" cy="46" r="7" fill="#facc15" />
      {/* Eye Pupil */}
      <circle cx="72" cy="46" r="4" fill="#0f172a" />
      {/* Eye Glint */}
      <circle cx="73.5" cy="44.5" r="1.5" fill="#ffffff" />

      {/* Chameleon Mouth */}
      <path d="M 80 58 Q 84 60 88 58" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

      {/* Front Foot */}
      <path d="M 68 74 C 70 80 74 84 78 84" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
      {/* Back Foot */}
      <path d="M 44 72 C 44 78 40 82 36 82" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};
