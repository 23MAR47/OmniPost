import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        platform: {
          youtube: "#FF0000",
          twitter: "#0F1419",
          instagram: "#E1306C",
          facebook: "#1877F2",
          tiktok: "#000000",
          pinterest: "#E60023",
          threads: "#101010",
        },
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSmooth: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(37, 99, 235, 0.18)' },
          '50%': { boxShadow: '0 0 30px rgba(37, 99, 235, 0.45)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        notifSlide: {
          from: { opacity: '0', transform: 'translateX(100%) scale(0.92)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
          '70%': { transform: 'scale(0.94)' },
          '100%': { transform: 'scale(1)' },
        },
        livePing: {
          '0%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.5)' },
          '70%': { boxShadow: '0 0 0 8px rgba(16,185,129,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'slide-left': 'slideInLeft 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'float': 'floatSmooth 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'gradient': 'gradientShift 5s ease infinite',
        'shimmer-sweep': 'shimmer 2.2s infinite',
        'notif-slide': 'notifSlide 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'bounce-in': 'bounceIn 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'live-ping': 'livePing 1.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      animationDelay: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
