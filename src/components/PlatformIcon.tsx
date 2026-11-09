'use client';

import React from 'react';
import { SocialPlatformId } from '@/types';

type PlatformIconSize = number | 'xs' | 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg', number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
};

interface PlatformIconProps {
  platformId?: SocialPlatformId | string;
  platform?: SocialPlatformId | string;
  className?: string;
  size?: PlatformIconSize;
  variant?: 'color' | 'mono' | 'badge';
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platformId,
  platform,
  className = 'w-4 h-4',
  size,
  variant = 'color',
}) => {
  const resolvedSize =
    size === undefined ? undefined : typeof size === 'number' ? size : SIZE_MAP[size];
  const sizeStyle = resolvedSize
    ? { width: `${resolvedSize}px`, height: `${resolvedSize}px` }
    : undefined;
  const platKey = (platformId || platform || '').toLowerCase();

  switch (platKey) {
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="YouTube"
        >
          {variant === 'badge' ? (
            <rect width="24" height="24" rx="6" fill="#FF0000" />
          ) : (
            <rect width="24" height="17" x="0" y="3.5" rx="4.5" fill="#FF0000" />
          )}
          <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'twitter':
    case 'x':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="X (Twitter)"
        >
          {variant === 'badge' && <rect width="24" height="24" rx="6" fill="#000000" />}
          <path
            fill={variant === 'badge' ? '#FFFFFF' : 'currentColor'}
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Instagram"
        >
          <defs>
            <linearGradient id="ig-grad-real" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFDC80" />
              <stop offset="25%" stopColor="#FD1D1D" />
              <stop offset="50%" stopColor="#E1306C" />
              <stop offset="75%" stopColor="#C13584" />
              <stop offset="100%" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <rect width="20" height="20" x="2" y="2" rx="5.5" fill="url(#ig-grad-real)" />
          <circle cx="12" cy="12" r="4.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#FFFFFF" />
        </svg>
      );

    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Facebook"
        >
          <circle cx="12" cy="12" r="11" fill="#1877F2" />
          <path
            d="M13.5 8.5H15V6H13C11.34 6 10 7.34 10 9V11H8V13.5H10V20H13V13.5H15L15.5 11H13V9C13 8.72 13.22 8.5 13.5 8.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="TikTok"
        >
          {variant === 'badge' ? (
            <rect width="24" height="24" rx="6" fill="#000000" />
          ) : (
            <rect width="22" height="22" x="1" y="1" rx="5" fill="#000000" />
          )}
          {/* TikTok dual chromatic note */}
          <path
            d="M16.6 6.8c1 .8 2.2 1.3 3.4 1.4v2.5c-1.3 0-2.6-.4-3.7-1.1v6.1c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6.3 0 .7 0 1 .1v2.7c-.3-.1-.6-.2-1-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 3-1.2 3-2.9V3.5h2.9c0 1.3.6 2.4 1.5 3.3z"
            fill="#25F4EE"
            transform="translate(-0.4, -0.4)"
            opacity="0.85"
          />
          <path
            d="M16.6 6.8c1 .8 2.2 1.3 3.4 1.4v2.5c-1.3 0-2.6-.4-3.7-1.1v6.1c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6.3 0 .7 0 1 .1v2.7c-.3-.1-.6-.2-1-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 3-1.2 3-2.9V3.5h2.9c0 1.3.6 2.4 1.5 3.3z"
            fill="#FE2C55"
            transform="translate(0.4, 0.4)"
            opacity="0.85"
          />
          <path
            d="M16.6 6.8c1 .8 2.2 1.3 3.4 1.4v2.5c-1.3 0-2.6-.4-3.7-1.1v6.1c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6.3 0 .7 0 1 .1v2.7c-.3-.1-.6-.2-1-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 3-1.2 3-2.9V3.5h2.9c0 1.3.6 2.4 1.5 3.3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'pinterest':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Pinterest"
        >
          <circle cx="12" cy="12" r="11" fill="#BD081C" />
          <path
            d="M12.2 4C7.8 4 5 7.1 5 10.6c0 2.5 1.5 4.5 3.8 5.2.3.1.6 0 .7-.4.1-.3.3-1.1.4-1.4.1-.4 0-.5-.2-.8-.6-.7-1-1.8-1-2.9 0-3 2.2-5.7 5.7-5.7 3.1 0 5 1.9 5 4.6 0 3.5-1.5 6-3.6 6-1.1 0-2-.9-1.7-2.1l.8-3.4c.2-.9-.2-1.7-1-1.7s-1.6.8-1.6 2c0 .8.3 1.3.3 1.3l-1.2 5.1c-.4 1.6-.1 3.7 0 4 .1.1.2.1.3 0 .2-.2 1.8-2.3 2.3-3.9l.4-1.6c.4.7 1.4 1.3 2.5 1.3 3.6 0 6.2-3.3 6.2-7.5C18.6 7 15.8 4 12.2 4z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'threads':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Threads"
        >
          <rect width="22" height="22" x="1" y="1" rx="6" fill="#101010" />
          <path
            d="M15.8 11.2c-.1-.3-.2-.5-.3-.7-.6-1.5-1.9-2.3-3.7-2.3-2.1 0-3.8 1.4-4.2 3.5-.4 2.3.8 4.3 3 4.8 1.2.3 2.3.1 3.2-.5v1.2c-.8.4-1.8.6-2.9.5-3-.3-5-2.7-4.6-5.8.4-2.8 2.7-4.9 5.6-4.9 2.5 0 4.3 1.3 5 3.4.3.8.4 1.7.3 2.7 0 2.4-1.2 4.1-3.2 4.5-1.2.2-2.3-.3-2.8-1.2l-.2-.5c-.6.9-1.5 1.4-2.7 1.4-1.6 0-2.8-1.2-2.8-2.7 0-1.8 1.4-3.1 3.6-3.1.6 0 1.2.1 1.7.3v-.6c0-1.3-.9-2.1-2.3-2.1-1 0-1.8.5-2.2 1.3l-1.1-.6c.6-1.2 1.8-2 3.4-2 2.2 0 3.6 1.3 3.6 3.4v4.3c0 .8.5 1.3 1.3 1.2 1.2-.2 1.9-1.3 1.9-2.9.1-.8 0-1.6-.2-2.3zm-3.3 2.1c-.4-.1-.8-.2-1.3-.2-1.3 0-2.1.7-2.1 1.7 0 .9.7 1.6 1.7 1.6 1 0 1.7-.7 1.7-1.7v-1.4z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="LinkedIn"
        >
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#0A66C2" />
          <path
            d="M7.5 18H5.5V10h2v8zm-1-8.9c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1zm11.5 8.9h-2v-4.2c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.8V18h-2s.03-7.2 0-8h2v1.1c.3-.5.9-1.2 2.2-1.2 1.6 0 2.8 1.1 2.8 3.4v4.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'googlebusiness':
    case 'google_business':
    case 'gmb':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Google Business Profile"
        >
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#4285F4" />
          <path
            d="M17.8 11.2h-5.6v2.4h3.2c-.3 1.5-1.6 2.4-3.2 2.4-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6c.9 0 1.7.3 2.3.9l1.8-1.8C15.2 6.8 13.8 6.2 12.2 6.2 8.9 6.2 6.2 8.9 6.2 12.2s2.7 6 6 6c3.4 0 5.8-2.4 5.8-5.9 0-.4 0-.8-.2-1.1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'telegram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Telegram"
        >
          <circle cx="12" cy="12" r="11" fill="#26A5E4" />
          <path
            d="M6.8 11.9l9.3-3.6c.4-.2.8.1.7.6l-1.6 7.4c-.1.5-.5.6-.9.4l-2.6-1.9-1.3 1.2c-.1.1-.3.3-.6.3l.2-2.7 4.9-4.4c.2-.2 0-.3-.3-.1l-6 3.8-2.6-.8c-.6-.2-.6-.6.1-.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'bluesky':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Bluesky"
        >
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#1185FE" />
          <path
            d="M12 11.3c1.3-2.5 3.6-4.5 5.5-4.5 1.5 0 2 1.3 1.2 2.7-.9 1.6-3.1 3-5 3.5 2.5.5 5.2 2 4.4 4.5-.6 1.8-2.8 1.4-4.5.3-1.1-.7-1.5-1.5-1.6-1.8-.1.3-.5 1.1-1.6 1.8-1.7 1.1-3.9 1.5-4.5-.3-.8-2.5 1.9-4 4.4-4.5-1.9-.5-4.1-1.9-5-3.5-.8-1.4-.3-2.7 1.2-2.7 1.9 0 4.2 2 5.5 4.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'discord':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Discord"
        >
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#5865F2" />
          <path
            d="M16.8 7.3c-1.1-.5-2.2-.8-3.3-.9l-.2.4c1.2.3 1.8.8 2.4 1.3-1.6-.8-3.2-1.3-4.8-1.3-1.6 0-3.2.5-4.8 1.3.6-.5 1.2-1 2.4-1.3l-.2-.4c-1.1.1-2.2.4-3.3.9C3.7 10.9 3.2 14.3 3.5 17.7c1.4 1 2.8 1.6 4.2 1.7l.6-.7c-.8-.2-1.5-.6-2.1-1.1.2.1.4.2.6.3 1.4.6 2.9 1 4.4 1s3-.4 4.4-1c.2-.1.4-.2.6-.3-.6.5-1.3.9-2.1 1.1l.6.7c1.4-.1 2.8-.7 4.2-1.7.3-3.4-.2-6.8-1.5-10.4zm-6.6 7.7c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6zm5 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'tumblr':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={sizeStyle}
          aria-label="Tumblr"
        >
          <rect width="22" height="22" x="1" y="1" rx="5" fill="#001935" />
          <path
            d="M14.6 18.2c-.7.2-1.4.2-1.8.2-1.8 0-2.3-1.1-2.3-2.4v-4.6H8.8V9.2c1.8-.6 2.3-2.1 2.4-3.4h2v3.1h2.4v2.5h-2.4v4.3c0 .7.3 1.1 1 1.1.4 0 .9-.1 1.2-.2l-.8 1.6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    default:
      return (
        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
          {platKey.slice(0, 1).toUpperCase()}
        </span>
      );
  }
};
