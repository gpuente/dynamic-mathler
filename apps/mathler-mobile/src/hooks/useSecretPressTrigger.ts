/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

type Callback = () => void;

export const useSecretPressTrigger = (callback?: Callback) => {
  const [clickCount, setClickCount] = useState(0);
  let timeoutRef: any = null;

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 4) {
      callback?.();
      setClickCount(0);
    } else {
      clearTimeout(timeoutRef);
      timeoutRef = setTimeout(() => {
        setClickCount(0);
      }, 1000);
    }
  };

  return handleClick;
};
