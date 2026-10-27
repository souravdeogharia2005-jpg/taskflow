import React from 'react';
import { useTheme } from '../../hooks/useTheme.js';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'retro') return 'desktop_windows';
    if (theme === 'dark') return 'dark_mode';
    return 'light_mode';
  };

  const getTitle = () => {
    if (theme === 'retro') return 'Theme: Retro Classic Web (Click for Night)';
    if (theme === 'dark') return 'Theme: Night Mode (Click for Modern Sky)';
    return 'Theme: Modern Sky (Click for Retro Classic)';
  };

  return (
    <button 
      className="btn-icon" 
      onClick={toggleTheme} 
      title={getTitle()}
      aria-label="Toggle theme"
      style={{
        width: '38px', height: '38px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
        {getIcon()}
      </span>
    </button>
  );
};

export default ThemeToggle;
