'use client';

import React from 'react';

interface EmptyBoxIllustrationProps {
  className?: string;
  size?: number;
}

export const EmptyBoxIllustration: React.FC<EmptyBoxIllustrationProps> = ({
  className = '',
  size = 180,
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        {/* Curving dashed flight path for paper airplane */}
        <path
          d="M125 125 C 115 90, 105 75, 130 55 C 145 42, 140 30, 136 26"
          stroke="#3b82f6"
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Paper Airplane at the tip */}
        <g transform="translate(132, 18) rotate(-22)">
          <path
            d="M0 0 L24 8 L10 14 Z"
            fill="#60a5fa"
          />
          <path
            d="M0 0 L24 8 L16 -4 Z"
            fill="#3b82f6"
          />
          <path
            d="M10 14 L14 19 L15 11 Z"
            fill="#2563eb"
          />
        </g>

        {/* Shadow under box */}
        <ellipse cx="120" cy="195" rx="58" ry="14" fill="#e2e8f0" opacity="0.6" />

        {/* Open Box Container */}
        {/* Inside dark shading */}
        <polygon points="65,115 120,135 175,115 120,95" fill="#93c5fd" opacity="0.75" />

        {/* Left Flap (open outward) */}
        <polygon points="65,115 35,95 80,82 110,102" fill="#bfdbfe" />

        {/* Right Flap (open outward) */}
        <polygon points="175,115 205,95 160,82 130,102" fill="#bfdbfe" />

        {/* Back Flap */}
        <polygon points="110,102 120,70 145,74 130,102" fill="#dbeafe" />

        {/* Front Left Face of Box */}
        <polygon points="65,115 120,135 120,185 65,160" fill="#93c5fd" />

        {/* Front Right Face of Box */}
        <polygon points="120,135 175,115 175,160 120,185" fill="#60a5fa" />

        {/* Front Flap (open downward) */}
        <polygon points="65,115 120,135 120,165 75,142" fill="#dbeafe" opacity="0.9" />
        <polygon points="120,135 175,115 165,142 120,165" fill="#bfdbfe" opacity="0.9" />
      </svg>
    </div>
  );
};
