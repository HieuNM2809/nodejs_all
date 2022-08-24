// export  const throttle = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
//     const now = () => new Date().getTime()
//     const resetStartTime = () => startTime = now()
//     let timeout: any
//     let startTime: number = now() - waitFor
  
//     return (...args: Parameters<F>): Promise<ReturnType<F>> =>
//       new Promise((resolve) => {
//         const timeLeft = (startTime + waitFor) - now()
//         if (timeout) {
//           clearTimeout(timeout)
//         }
//         if (startTime + waitFor <= now()) {
//           resetStartTime()
//           resolve(func(...args))
//         } else {
//           timeout = setTimeout(() => {
//             resetStartTime()
//             resolve(func(...args))
//           }, timeLeft)
//         }
//       })
//   }
import { useMemo, useState } from 'react';

const debounce = (fn: any, delay: number) => {
  let timeout : any = -1;
  return (...args: any[]) => {
    if (timeout !== -1) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, delay, ...args);
  };
};

export function useStateDebounced<T>(initialValue: T, delay: number) {
  const [inputValue, _setInputValue] = useState<T>(initialValue);

  const [debouncedInputValue, setDebouncedInputValue] = useState<T>(
    initialValue
  );

  const memoizedDebounce = useMemo(
    () =>
      debounce((value: T) => {
        setDebouncedInputValue(value);
      }, delay),
    [delay]
  );

  const setInputValue = (value: T | ((prevState: T) => T)) => {
    if (value instanceof Function) {
      _setInputValue((p) => {
        const mutated = value(p);
        memoizedDebounce(mutated);
        return mutated;
      });
    } else {
      _setInputValue(value);
      memoizedDebounce(value);
    }
  };

  return [inputValue, debouncedInputValue, setInputValue] as const;
}