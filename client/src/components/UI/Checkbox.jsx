import React from 'react';

const Checkbox = ({ checked, onChange }) => (
  <div 
    className={`checkbox-circle ${checked ? 'checked' : ''}`} 
    onClick={() => onChange(!checked)}
  >
    {checked && <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>}
  </div>
);

export default Checkbox;
