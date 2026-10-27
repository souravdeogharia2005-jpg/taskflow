import React from 'react';

const getPriorityClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return 'badge--error';
    case 'medium': return 'badge--warning';
    case 'low': return 'badge--success';
    default: return 'badge--success';
  }
};

const PriorityBadge = ({ priority }) => (
  <div className={`badge ${getPriorityClass(priority)}`}>
    <span className="dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
    {priority}
  </div>
);

export default PriorityBadge;
