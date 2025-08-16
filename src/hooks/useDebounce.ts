import { useEffect, useState } from 'react';

export const useDebounce = <T extends string>(value: T, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { value: debouncedValue, isPending };
};
