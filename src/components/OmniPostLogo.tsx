'use client';

import React from 'react';

export interface OmniPostLogoProps {
  /** Size in pixels (width & height). Default: 40 */
  size?: number;
  /** Custom CSS classes for the container */
  className?: string;
  /** Shape style: 'circle' (classic Telegram), 'squircle' (macOS / iOS app icon), or 'plain' (no background) */
  variant?: 'circle' | 'squircle' | 'plain';
  /** Whether to show multi-platform broadcast signals / trails behind the plane */
  showTrails?: boolean;
  /** Hover / floating animation enabled */
  animated?: boolean;
}

/**
 * OmniPost Official Brand Logo
 * 
 * Inspired by Telegram's iconic paper airplane silhouette, engineered for OmniPost:
 * - Authentic aerodynamic paper plane geometry
 * - Vibrant Telegram cyan-blue to electric royal-blue gradient
 * - Multi-platform broadcasting wave accents symbolizing omni-channel distribution
 * - Soft specular lighting and dimensional depth fold
 */
export const OmniPostLogo: React.FC<OmniPostLogoProps> = ({
  size = 40,
  className = '',
  variant = 'circle',
  showTrails = true,
  animated = false,
}) => {
  const isPlain = variant === 'plain';
  const isSquircle = variant === 'squircle';

  // Plane SVG content (viewBox 0 0 240 240)
  const planeContent = (
    <svg
      viewBox="0 0 240 240"
      width={isPlain ? size : size * 0.9}
      height={isPlain ? size : size * 0.9}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${animated ? 'transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:rotate-1' : ''}`}
      style={{ filter: isPlain ? 'drop-shadow(0 2px 8px rgba(34, 158, 217, 0.4))' : undefined }}
    >
      <defs>
        {/* Telegram inspired rich vibrant gradient */}
        <linearGradient id="omniTgGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#2BB8FF" />
          <stop offset="45%" stopColor="#229ED9" />
          <stop offset="100%" stopColor="#1E6FD9" />
        </linearGradient>

        {/* Ambient Top Glare */}
        <radialGradient id="omniGlare" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Plane subtle 3D shadow */}
        <filter id="omniPlaneShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#003566" floodOpacity="0.25" />
        </filter>

        {/* Underside fold gradient */}
        <linearGradient id="omniFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CFE7F7" />
          <stop offset="100%" stopColor="#B3DCF5" />
        </linearGradient>
      </defs>

      {/* Background Shape (Circle or Squircle) */}
      {!isPlain && (
        <g>
          {isSquircle ? (
            <rect
              x="8"
              y="8"
              width="224"
              height="224"
              rx="56"
              fill="url(#omniTgGrad)"
            />
          ) : (
            <circle cx="120" cy="120" r="112" fill="url(#omniTgGrad)" />
          )}

          {/* Top highlight / specular gloss */}
          {isSquircle ? (
            <rect
              x="8"
              y="8"
              width="224"
              height="224"
              rx="56"
              fill="url(#omniGlare)"
            />
          ) : (
            <circle cx="120" cy="120" r="112" fill="url(#omniGlare)" />
          )}

          {/* Inner border stroke for premium glass/app feel */}
          {isSquircle ? (
            <rect
              x="9"
              y="9"
              width="222"
              height="222"
              rx="55"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.32"
              strokeWidth="2"
            />
          ) : (
            <circle
              cx="120"
              cy="120"
              r="111"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.32"
              strokeWidth="2"
            />
          )}
        </g>
      )}

      {/* Multi-Platform Broadcast Signals / Dynamic Omni-Trails */}
      {showTrails && (
        <g opacity="0.85">
          {/* Signal Arc 1 (outer) */}
          <path
            d="M 175 42 C 192 56 202 76 205 98"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.45"
            strokeDasharray="2 1"
          />
          {/* Signal Arc 2 (inner) */}
          <path
            d="M 183 54 C 196 66 203 82 205 100"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          {/* Multi-distribution speed dashes behind wing */}
          <path
            d="M 38 128 L 22 135"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
          <path
            d="M 44 142 L 32 147"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
        </g>
      )}

      {/* The 3D Under-fold facet (gives true Telegram paper origami depth) */}
      <path
        d="M 112 153 L 126 172 L 132 143 Z"
        fill="url(#omniFoldGrad)"
        opacity="0.95"
      />

      {/* Main Telegram Paper Airplane Silhouette */}
      <path
        d="M 54.3 118.8
           C 89.3 103.6 112.6 93.5 124.3 88.5
           C 157.6 74.6 164.5 72.2 169 72.1
           C 170 72.1 172.2 72.3 173.7 73.5
           C 174.9 74.5 175.3 75.8 175.4 76.8
           C 175.5 77.8 175.8 80 175.6 81.7
           C 173.3 106.1 163.3 165 158.3 192.1
           C 158.1 193.2 157.4 195.6 155.6 196.4
           C 153.8 197.2 151.9 196.6 151.1 196
           C 149.8 195 129.2 181.2 121.4 175.8
           C 119.2 174.3 114.7 171.3 115.1 168
           C 115.5 164.7 119.9 160.4 122.6 157.8
           C 133.4 147.2 146.7 133.9 147.6 132.7
           C 148.6 131.4 148.2 130.3 146.8 130.3
           C 145.4 130.3 130.5 140.2 123.4 145
           C 116.3 149.9 109.4 154.4 107.8 154.8
           C 106.2 155.2 102.5 154.4 99.6 153.5
           C 96.2 152.4 91.8 150.9 88.1 149.7
           C 84.2 148.4 83.3 147.4 83.6 145.5
           C 83.9 143.6 85.6 142.4 88.1 142.1
           Z"
        fill="#FFFFFF"
        filter={!isPlain ? 'url(#omniPlaneShadow)' : undefined}
      />
    </svg>
  );

  if (isPlain) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {planeContent}
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 12px rgba(34, 158, 217, 0.35))',
      }}
    >
      {planeContent}
    </div>
  );
};

/**
 * OmniPost Brand Lockup (Logo + Modern Wordmark)
 */
export interface OmniPostBrandProps {
  size?: number;
  showSubtitle?: boolean;
  className?: string;
}

export const OmniPostBrand: React.FC<OmniPostBrandProps> = ({
  size = 40,
  showSubtitle = true,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-3 group cursor-pointer ${className}`}>
      <OmniPostLogo size={size} animated />
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
            Omni<span className="text-blue-600">Post</span>
          </span>
          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 leading-none">
            PRO
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] text-slate-400 font-medium tracking-tight mt-0.5 hidden sm:block">
            Sosyal Medya Dağıtım Stüdyosu
          </span>
        )}
      </div>
    </div>
  );
};

export default OmniPostLogo;
