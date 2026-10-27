import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ value, onChange, options, placeholder = 'Select...' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const selected = options.find(o => o.value === value);
  return (
    <div className={`dropdown ${open ? 'dropdown--open' : ''}`} ref={ref}>
      <button type="button" className="dropdown-trigger" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span>{selected ? selected.label : placeholder}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul className="dropdown-menu" role="listbox">
          {options.map(opt => (
            <li key={opt.value} className={`dropdown-item ${opt.value === value ? 'dropdown-item--active' : ''}`}
              role="option" aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}>
              {opt.icon && <span>{opt.icon}</span>}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
