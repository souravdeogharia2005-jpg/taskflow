import { useState, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage.js';

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => loadFromStorage(key, defaultValue));
  const set = useCallback((val) => {
    setValue(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      saveToStorage(key, next);
      return next;
    });
  }, [key]);
  return [value, set];
};
