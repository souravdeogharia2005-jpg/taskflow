import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage.js';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => loadFromStorage('theme', 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToStorage('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => {
      if (t === 'light') return 'retro';
      if (t === 'retro') return 'dark';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
