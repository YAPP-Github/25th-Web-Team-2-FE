'use client';

import { useEffect, useState } from 'react';

const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    const init = async () => {
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
