import { useEffect, useState } from 'react';

const useSessionStorage = (key: string, defaultValue: string = '') => {
  const [storedValue, setStoredValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value = sessionStorage.getItem(key) || defaultValue;
      setStoredValue(value);
    }
  }, [key, defaultValue]);

  return storedValue;
};

export default useSessionStorage;
