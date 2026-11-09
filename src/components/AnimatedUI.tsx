'use client';

/**
 * AnimatedCounter – 21st.dev style animated number count-up
 * Usage: <AnimatedCounter value={42} suffix="%" />
 */

import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal – görünüre girince yukarı doğru beliren sarmalayıcı.
 * Kullanım: <Reveal delay={150}><h2>...</h2></Reveal>
 */
export const Reveal: React.FC<{
  children: React.ReactNode;
  /** Milisaniye cinsinden gecikme */
  delay?: number;
  className?: string;
  /** Bir kez mi yoksa her görünürlükte mi animasyon oynasın */
  once?: boolean;
}> = ({ children, delay = 0, className = '', once = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observerRef.current?.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (containerRef.current) observerRef.current.observe(containerRef.current);

    return () => observerRef.current?.disconnect();
  }, [once]);

  return (
    <div
      ref={containerRef}
      className={`${visible ? 'reveal-visible' : 'reveal-hidden'} ${className}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const startAnimation = () => {
    startTimeRef.current = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setDisplayValue(Math.floor(easedProgress * value));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      observerRef.current?.disconnect();
    };
  }, [value]);

  return (
    <span ref={containerRef} className={`tabular-nums ${className}`}>
      {prefix}{displayValue.toLocaleString('tr-TR')}{suffix}
    </span>
  );
};

/**
 * PulsingBadge – live status indicator
 */
export const PulsingBadge: React.FC<{
  label: string;
  color?: 'green' | 'blue' | 'amber' | 'red';
  className?: string;
}> = ({ label, color = 'green', className = '' }) => {
  const colors = {
    green: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200/80', ping: 'bg-emerald-400' },
    blue:  { dot: 'bg-blue-500',    text: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200/80',    ping: 'bg-blue-400' },
    amber: { dot: 'bg-amber-500',   text: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200/80',   ping: 'bg-amber-400' },
    red:   { dot: 'bg-red-500',     text: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200/80',     ping: 'bg-red-400' },
  };
  const c = colors[color];

  return (
    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text} ${c.border} ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.ping} opacity-60`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
      </span>
      <span>{label}</span>
    </span>
  );
};

/**
 * ProgressRing – SVG circular progress
 */
export const ProgressRing: React.FC<{
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}> = ({ value, max, size = 48, strokeWidth = 4, className = '' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);
  const isOver = value > max;

  return (
    <svg width={size} height={size} className={`-rotate-90 ${className}`}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={isOver ? '#ef4444' : progress > 0.85 ? '#f59e0b' : '#2563eb'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="char-ring transition-all duration-500"
      />
    </svg>
  );
};

/**
 * Skeleton – loading placeholder
 */
export const Skeleton: React.FC<{
  className?: string;
  rounded?: string;
}> = ({ className = '', rounded = 'rounded-md' }) => (
  <div className={`skeleton ${rounded} ${className}`} />
);

/**
 * GlowDot – ambient glow dot decoration
 */
export const GlowDot: React.FC<{
  color?: string;
  size?: number;
  className?: string;
}> = ({ color = '#2563eb', size = 200, className = '' }) => (
  <div
    className={`absolute pointer-events-none rounded-full opacity-20 blur-3xl animate-float ${className}`}
    style={{
      width: size,
      height: size,
      background: color,
    }}
  />
);
