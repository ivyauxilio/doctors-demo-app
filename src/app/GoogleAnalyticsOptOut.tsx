// components/GoogleAnalyticsOptOut.tsx
'use client';

import { useEffect } from 'react';

export default function GoogleAnalyticsOptOut() {
  useEffect(() => {
    document.body.setAttribute('data-google-analytics-opt-out', '');
  }, []);

  return null;
}
