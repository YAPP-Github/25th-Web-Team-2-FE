'use client';

import { useEffect, useRef, useState } from 'react';

const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMSWReady, setIsMSWReady] = useState(false);
  const isStartedRef = useRef(false);

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
