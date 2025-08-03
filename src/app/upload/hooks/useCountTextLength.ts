import { ChangeEvent, useState } from 'react';

const useCountTextLength = <T extends HTMLInputElement | HTMLTextAreaElement>(
  value: string | number | null,
) => {
  const [textLength, setTextLength] = useState(typeof value === 'string' ? value.length : 0);

  const handleChange = (e: ChangeEvent<T>) => {
    setTextLength(e.target.value.length);
    return e;
  };

  return { textLength, handleChange };
};

export default useCountTextLength;
