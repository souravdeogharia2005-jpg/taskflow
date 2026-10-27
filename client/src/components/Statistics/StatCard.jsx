import React, { useState, useEffect } from 'react';
import { animateCountUp } from '../../animations/chartAnimations.js';

const StatCard = ({ title, value, icon, color, trend }) => {
  const [displayVal, setDisplayVal] = useState(0);
  useEffect(() => { animateCountUp(setDisplayVal, value); }, [value]);

  return (
    <div className="card" style={{ flex: 1, minWidth: '200px' }}>
      <div className="flex items-center justify-between mb-4">
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: `${color}20`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-sm)', color: trend.up ? 'var(--priority-low)' : 'var(--priority-high)', fontWeight: '600' }}>
            {trend.up ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: '500', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '36px', fontWeight: '800' }}>{displayVal}</div>
    </div>
  );
};
export default StatCard;
