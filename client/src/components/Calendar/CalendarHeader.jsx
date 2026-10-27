import React from 'react';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, onPrev, onNext }) => (
  <div className="flex items-center justify-between mb-6 animate-in">
    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: '700' }}>{format(currentMonth, 'MMMM yyyy')}</h2>
    <div className="flex gap-2">
      <button className="btn btn--icon" onClick={onPrev} style={{ background: 'var(--surface-2)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className="btn btn--icon" onClick={onNext} style={{ background: 'var(--surface-2)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
);
export default CalendarHeader;
