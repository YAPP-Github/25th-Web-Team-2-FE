import { useEffect, useRef, useState } from 'react';

const TEN_MINUTE_SEC = 600;
const ONE_SEC = 1000;

const useAuthCodeTimer = () => {
  const [authTimer, setAuthTimer] = useState(TEN_MINUTE_SEC);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    if (timerRef.current) {
      stopTimer();
      setAuthTimer(TEN_MINUTE_SEC);
    }

    timerRef.current = setInterval(() => {
      setAuthTimer((prev) => prev - 1);
    }, ONE_SEC);
  };

  useEffect(() => {
    if (authTimer <= 0) {
      stopTimer();
    }
  }, [authTimer]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { authTimer, startTimer, stopTimer };
};

export default useAuthCodeTimer;
