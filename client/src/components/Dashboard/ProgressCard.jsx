import React from 'react';

const ProgressCard = ({ completed = 0, total = 0, allCompleted = 0, allTotal = 0 }) => {
  // Use today's count if available, otherwise fallback to overall tasks so bar never sits dead at 0%
  const isTodayMode = total > 0;
  const effectiveTotal = isTodayMode ? total : allTotal;
  const effectiveCompleted = isTodayMode ? completed : allCompleted;
  
  const percentage = effectiveTotal === 0 ? 0 : Math.round((effectiveCompleted / effectiveTotal) * 100);
  const isFinished = effectiveTotal > 0 && effectiveCompleted === effectiveTotal;
  const filledSegments = Math.round((percentage / 100) * 10);

  return (
    <div className="card hover-card-lift" style={{
      width: '100%',
      borderRadius: 'var(--radius-large)',
      backgroundColor: 'var(--surface-container-lowest)',
      padding: '20px',
      boxShadow: 'var(--shadow-card-md)',
      border: '1px solid var(--surface-container)',
      marginBottom: '24px',
      transition: 'all 0.25s ease'
    }}>
      {/* Header: Title and Live Percentage */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '800', textTransform: 'uppercase', color: isFinished ? 'var(--success)' : 'var(--primary)' }}>
              {isTodayMode ? "Today's Target" : (effectiveTotal > 0 ? "Active Tasks" : "Daily Target")}
            </span>
            <span style={{ 
              fontSize: '11px', 
              backgroundColor: isFinished ? 'var(--success-surface)' : 'var(--primary-surface)', 
              color: isFinished ? 'var(--success)' : 'var(--primary)', 
              padding: '2px 8px', borderRadius: '9999px', fontWeight: '800' 
            }}>
              {isFinished ? '✨ 100% Completed' : '⚡ Live Tracker'}
            </span>
          </div>
          <h2 style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '800', color: 'var(--on-surface)', marginTop: '4px' }}>
            {isTodayMode ? "Today's Progress" : (effectiveTotal > 0 ? "Task Progress" : "Today's Progress")}
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{ 
            fontSize: '34px', lineHeight: '36px', letterSpacing: '-0.03em', fontWeight: '900', 
            color: isFinished ? 'var(--success)' : 'var(--primary)',
            transition: 'color 0.3s ease'
          }}>
            {percentage}
          </span>
          <span style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '800', color: isFinished ? 'var(--success)' : 'var(--primary)' }}>
            %
          </span>
        </div>
      </div>
      
      {/* Real-Time Continuous Glowing Animated Bar */}
      <div style={{
        width: '100%',
        height: '10px',
        borderRadius: '9999px',
        backgroundColor: 'var(--surface-container-high)',
        overflow: 'hidden',
        position: 'relative',
        marginTop: '12px',
        marginBottom: '6px'
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          borderRadius: '9999px',
          background: isFinished 
            ? 'linear-gradient(90deg, #34A853 0%, #10B981 100%)' 
            : 'linear-gradient(90deg, var(--primary) 0%, var(--primary-container) 100%)',
          boxShadow: percentage > 0 
            ? (isFinished ? '0 0 12px rgba(16, 185, 129, 0.45)' : '0 0 12px var(--primary-glow)') 
            : 'none',
          transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease'
        }}></div>
      </div>

      {/* 10-Segment Micro-Tick Indicators */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px', marginBottom: '10px' }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            height: '3px',
            borderRadius: '2px',
            backgroundColor: i < filledSegments 
              ? (isFinished ? 'var(--success)' : 'var(--primary)') 
              : 'var(--surface-container)',
            transition: 'background-color 0.3s ease'
          }}></div>
        ))}
      </div>
      
      {/* Footer Info Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)' }}>
          <span className="material-symbols-outlined" style={{ 
            fontSize: '18px', 
            color: isFinished ? 'var(--success)' : (effectiveCompleted > 0 ? 'var(--primary)' : 'var(--secondary)') 
          }}>
            {isFinished ? 'verified' : (effectiveCompleted > 0 ? 'task_alt' : 'radio_button_unchecked')}
          </span>
          <span style={{ fontSize: '12px', lineHeight: '16px', fontWeight: '700', color: 'var(--on-surface-variant)' }}>
            {effectiveTotal === 0 
              ? 'No tasks scheduled — add a task to begin!' 
              : (isFinished 
                  ? 'All tasks completed! Fantastic work!' 
                  : `${effectiveCompleted} of ${effectiveTotal} task${effectiveTotal !== 1 ? 's' : ''} completed`)}
          </span>
        </div>
        <span style={{ 
          fontSize: '11px', lineHeight: '14px', letterSpacing: '0.02em', fontWeight: '800', 
          color: isFinished ? 'var(--success)' : 'var(--primary)', 
          backgroundColor: isFinished ? 'var(--success-surface)' : 'var(--primary-surface)', 
          padding: '4px 10px', borderRadius: '9999px',
          transition: 'all 0.2s ease'
        }}>
          {effectiveTotal === 0 
            ? 'Fresh slate' 
            : (isFinished 
                ? 'All Done 🏆' 
                : `${effectiveTotal - effectiveCompleted} pending`)}
        </span>
      </div>
    </div>
  );
};

export default ProgressCard;
