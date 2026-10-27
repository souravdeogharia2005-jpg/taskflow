import React from 'react';

const dates = [
  { day: 'Mon', date: '7' },
  { day: 'Tue', date: '8' },
  { day: 'Wed', date: '9' },
  { day: 'Thu', date: '10', active: true },
  { day: 'Fri', date: '11' },
  { day: 'Sat', date: '12' },
];

const DateSelector = () => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '16px' }} className="no-scrollbar">
      {dates.map((d, i) => (
        <div key={i} className={`calendar-day ${d.active ? 'active' : ''}`}>
          <span style={{ fontSize: 'var(--text-label-sm)', fontWeight: '600', opacity: d.active ? 1 : 0.6, marginBottom: '4px' }}>{d.day}</span>
          <span style={{ fontSize: 'var(--text-headline-md)', fontWeight: '700' }}>{d.date}</span>
          <div className="dot" />
        </div>
      ))}
    </div>
    
    <div style={{ padding: '16px', backgroundColor: 'var(--surface-container)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: '700' }}>Thursday, September 10</div>
        <div style={{ fontSize: 'var(--text-label-sm)', color: 'var(--on-surface-variant)' }}>5 tasks today</div>
      </div>
      <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
      </button>
    </div>
  </div>
);

export default DateSelector;
