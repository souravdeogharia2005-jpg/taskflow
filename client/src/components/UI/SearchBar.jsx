import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search tasks...', className = '' }) => (
  <div className={`search-bar ${className}`}>
    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" className="search-input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
    {value && (
      <button type="button" className="search-clear btn btn--icon" onClick={() => onChange('')} aria-label="Clear search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    )}
  </div>
);
export default SearchBar;
