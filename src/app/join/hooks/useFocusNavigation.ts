import { useRef, useCallback } from 'react';

export const useFocusNavigation = (inputOrder: string[]) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const focusNextInput = useCallback(
    (currentInputName: string) => {
      const currentIndex = inputOrder.indexOf(currentInputName);
      const nextIndex = currentIndex + 1;

      if (nextIndex < inputOrder.length) {
        const nextInputName = inputOrder[nextIndex];
        inputRefs.current[nextInputName]?.focus();
      }
    },
    [inputOrder],
  );

  const handleKeyDown = useCallback(
    (inputName: string) => (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        focusNextInput(inputName);
      }
    },
    [focusNextInput],
  );

  const setInputRef = useCallback(
    (inputName: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      inputRefs.current[inputName] = el;
    },
    [],
  );

  return { handleKeyDown, setInputRef };
};
