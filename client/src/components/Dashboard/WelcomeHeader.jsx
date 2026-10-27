import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';

const WelcomeHeader = ({ tasksCount }) => {
  const { userName } = useTaskContext();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: '26px', lineHeight: '32px', letterSpacing: '-0.025em', fontWeight: '800', color: 'var(--on-surface)' }}>
            Hey, {userName || 'there'} 👋
          </h1>
        </div>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: '13px', lineHeight: '18px', color: 'var(--secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {tasksCount > 0 ? (
            <>
              <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{tasksCount} pending task{tasksCount !== 1 ? 's' : ''}</span> scheduled for today!
            </>
          ) : (
            <>
              <span>All caught up! Zero tasks pending. Tap + to add a task.</span>
            </>
          )}
        </p>
      </div>
      
      <div 
        onClick={() => navigate('/settings')}
        title="Settings"
        style={{ 
          width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden', 
          boxShadow: '0 4px 12px var(--primary-glow)', flexShrink: 0, 
          backgroundColor: 'var(--primary)', color: '#ffffff', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '800', fontSize: '17px', cursor: 'pointer',
          border: '2px solid var(--surface-container-lowest)'
        }}
      >
        {userName ? userName.charAt(0).toUpperCase() : 'U'}
      </div>
    </div>
  );
};

export default WelcomeHeader;
