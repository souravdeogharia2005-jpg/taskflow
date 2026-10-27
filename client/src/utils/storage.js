const PREFIX = 'taskflow_';

export const loadFromStorage = (key, defaultValue) => {
  try {
    const val = localStorage.getItem(PREFIX + key);
    return val ? JSON.parse(val) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(PREFIX + key);
};

export const clearAllStorage = () => {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k));
};
