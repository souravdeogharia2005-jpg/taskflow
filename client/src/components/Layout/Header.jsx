import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../Theme/ThemeToggle';
import { useTaskContext } from '../../context/TaskContext';

const Header = () => {
  const { tasks, userName } = useTaskContext();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const todayStr = new Date().toISOString().slice(0, 10);
  const overdueTasks = tasks.filter(t => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
  });
  const todayTasks = tasks.filter(t => t.dueDate === todayStr && !t.completed);
  const totalAlerts = overdueTasks.length + todayTasks.length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="header-desk-badge" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          backgroundColor: 'var(--primary-surface)', color: 'var(--primary)',
          padding: '6px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>near_me</span>
          <span>Focus Desk</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)', marginLeft: '2px' }}></span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          className="btn-icon" 
          title="Search Tasks"
          onClick={() => navigate('/tasks')}
          style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
        </button>

        <button 
          className="btn-icon" 
          title="Filter Tasks"
          onClick={() => navigate('/tasks')}
          style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>tune</span>
        </button>

        <ThemeToggle />

        {/* Notifications Button & Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button 
            className="btn-icon" 
            title="Notifications"
            style={{ 
              position: 'relative', width: '38px', height: '38px', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: showNotifications ? 'var(--primary-surface)' : 'transparent',
              color: showNotifications ? 'var(--primary)' : 'inherit'
            }} 
            onClick={() => setShowNotifications(prev => !prev)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
            {overdueTasks.length > 0 && (
              <span style={{ 
                position: 'absolute', top: '4px', right: '4px', minWidth: '16px', height: '16px', 
                backgroundColor: 'var(--primary)', color: '#ffffff', borderRadius: '9999px', 
                fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', boxShadow: '0 2px 6px var(--primary-glow)' 
              }}>
                {overdueTasks.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown" style={{
              position: 'absolute', top: '46px', right: 0, width: '320px',
              backgroundColor: 'var(--surface-container-lowest)', borderRadius: '20px',
              boxShadow: 'var(--shadow-card-lg)', border: '1px solid var(--surface-container)',
              zIndex: 100, overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ 
                padding: '14px 16px', borderBottom: '1px solid var(--surface-container)', 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: 'var(--surface-container-low)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>notifications_active</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--on-surface)' }}>Alerts & Tasks</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', backgroundColor: 'var(--primary-surface)', padding: '2px 8px', borderRadius: '9999px' }}>
                  {totalAlerts} Active
                </span>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '8px' }}>
                {overdueTasks.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', padding: '4px 8px' }}>
                      Overdue Tasks ({overdueTasks.length})
                    </div>
                    {overdueTasks.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => { setShowNotifications(false); navigate(`/tasks/${t.id}`); }}
                        style={{
                          padding: '10px 12px', borderRadius: '12px', cursor: 'pointer',
                          backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)',
                          marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {t.title}
                          </div>
                          <div style={{ fontSize: '11px', opacity: 0.85 }}>Due {t.dueDate}</div>
                        </div>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                      </div>
                    ))}
                  </div>
                )}

                {todayTasks.length > 0 && (
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', padding: '4px 8px' }}>
                      Due Today ({todayTasks.length})
                    </div>
                    {todayTasks.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => { setShowNotifications(false); navigate(`/tasks/${t.id}`); }}
                        style={{
                          padding: '10px 12px', borderRadius: '12px', cursor: 'pointer',
                          backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)',
                          marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {t.title}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--secondary)' }}>{t.dueTime ? `Due ${t.dueTime}` : 'Due today'}</div>
                        </div>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--secondary)' }}>chevron_right</span>
                      </div>
                    ))}
                  </div>
                )}

                {overdueTasks.length === 0 && todayTasks.length === 0 && (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--secondary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--success)', marginBottom: '6px' }}>verified</span>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>All tasks on track!</div>
                    <div style={{ fontSize: '11px', marginTop: '2px' }}>Zero overdue tasks. You are all caught up!</div>
                  </div>
                )}
              </div>

              <div style={{ padding: '8px 12px', borderTop: '1px solid var(--surface-container)', backgroundColor: 'var(--surface-container-low)', textAlign: 'center' }}>
                <button 
                  onClick={() => { setShowNotifications(false); navigate('/tasks'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Explore All Tasks →
                </button>
              </div>
            </div>
          )}
        </div>

        <div 
          onClick={() => navigate('/settings')} 
          title="Settings / Profile"
          style={{ 
            width: '38px', height: '38px', borderRadius: '50%', 
            backgroundColor: 'var(--primary)', color: '#ffffff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            marginLeft: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '14px',
            boxShadow: '0 2px 8px var(--primary-glow)'
          }}
        >
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
    </header>
  );
};

export default Header;
