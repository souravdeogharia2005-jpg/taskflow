import React from 'react';

const EmptyState = ({ 
  icon = 'task_alt', 
  title = 'No tasks found', 
  description = 'Get organized by adding your first task.', 
  action, 
  actionLabel = 'Add New Task' 
}) => {
  const isEmoji = icon && /\p{Extended_Pictographic}/u.test(icon);

  return (
    <div style={{
      textAlign: 'center', padding: '48px 24px', backgroundColor: 'var(--surface-container-lowest)',
      borderRadius: '24px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        backgroundColor: 'var(--primary-surface)', color: 'var(--primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px', boxShadow: '0 6px 18px var(--primary-glow)'
      }}>
        {isEmoji ? (
          <span style={{ fontSize: '32px' }}>{icon}</span>
        ) : (
          <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>{icon}</span>
        )}
      </div>
      
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '6px' }}>
        {title}
      </h3>
      
      {description && (
        <p style={{ fontSize: '13px', lineHeight: '20px', color: 'var(--secondary)', maxWidth: '340px', marginBottom: action ? '20px' : '0' }}>
          {description}
        </p>
      )}

      {action && (
        <button 
          onClick={action}
          style={{
            height: '44px', padding: '0 24px', borderRadius: '9999px',
            backgroundColor: 'var(--primary)', color: '#ffffff',
            boxShadow: 'var(--shadow-fab)', display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
