'use client';

import { useEffect, useRef, useState } from 'react';

const isMSWEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enable';

const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMSWReady, setIsMSWReady] = useState(!isMSWEnabled);
  const isStartedRef = useRef(!isMSWEnabled);

  useEffect(() => {
    const init = async () => {
      if (isStartedRef.current) return;
      isStartedRef.current = true;

      const initMSW = await import('./index').then((res) => res.initMSW);
      await initMSW();
      setIsMSWReady(true);
    };

    if (!isMSWReady) {
      init();
    }
  }, [isMSWReady]);

  if (!isMSWReady) return null;

  return <>{children}</>;
};

export default MSWProvider;
