import React from 'react';

const ProgressCard = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const filledSegments = Math.round((percentage / 100) * 10);
  
  return (
    <div className="card hover-card-lift" style={{
      width: '100%',
      borderRadius: 'var(--radius-large)',
      backgroundColor: 'var(--surface-container-lowest)',
      padding: '20px',
      boxShadow: 'var(--shadow-card-md)',
      border: '1px solid var(--surface-container)',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary)' }}>Daily Target</span>
            <span style={{ fontSize: '11px', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '9999px', fontWeight: '700' }}>⚡ Realtime</span>
          </div>
          <h2 style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '800', color: 'var(--on-surface)', marginTop: '4px' }}>Today's Progress</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{ fontSize: '32px', lineHeight: '36px', letterSpacing: '-0.03em', fontWeight: '900', color: 'var(--primary)' }}>{percentage}</span>
          <span style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '800', color: 'var(--primary)' }}>%</span>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px', marginTop: '12px', marginBottom: '8px' }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            height: '8px',
            borderRadius: '9999px',
            backgroundColor: i < filledSegments ? 'var(--primary)' : 'var(--surface-container-high)',
            transition: 'background-color 0.4s ease'
          }}></div>
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: completed > 0 ? 'var(--success)' : 'var(--secondary)' }}>
            {completed > 0 ? 'verified' : 'radio_button_unchecked'}
          </span>
          <span style={{ fontSize: '12px', lineHeight: '16px', fontWeight: '700' }}>
            {total === 0 ? 'No tasks scheduled today' : `${completed} of ${total} tasks completed`}
          </span>
        </div>
        <span style={{ 
          fontSize: '11px', lineHeight: '14px', letterSpacing: '0.02em', fontWeight: '800', 
          color: 'var(--primary)', backgroundColor: 'var(--primary-surface)', 
          padding: '4px 10px', borderRadius: '9999px' 
        }}>
          {total === 0 ? 'Fresh slate' : `${total - completed} pending`}
        </span>
      </div>
    </div>
  );
};

export default ProgressCard;
