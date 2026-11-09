'use client';

import React from 'react';
import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-OMNIPOST26',
}) => {
  if (!measurementId) return null;

  return (
    <>
      {/* 1. Global Site Tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      {/* 2. Google Consent Mode v2 + Configuration */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Default Consent Mode v2 (Deny until user accepts in Cookie Consent)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });

            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
};

/**
 * Custom Event Tracker for OmniPost Actions
 */
export function trackOmniEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}
