'use client';

import { useEffect, useState } from 'react';

const useSessionStorage = (key: string = '', defaultValue: string = '') => {
  const [storedValue, setStoredValue] = useState(defaultValue);

  const clear = () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value = sessionStorage.getItem(key) || defaultValue;
      setStoredValue(value);
    }
  }, [key, defaultValue]);

  return { value: storedValue, clear };
};

export default useSessionStorage;
