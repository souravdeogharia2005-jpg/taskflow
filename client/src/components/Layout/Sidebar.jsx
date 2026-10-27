import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext.jsx';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/tasks', label: 'My Tasks', icon: 'task_alt' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar_today' },
  { to: '/categories', label: 'Categories', icon: 'folder_open' },
  { to: '/statistics', label: 'Statistics', icon: 'bar_chart' },
  { to: '/completed', label: 'Completed', icon: 'done_all' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
];

const Sidebar = () => {
  const { openTaskModal } = useTaskContext();
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '12px',
            backgroundColor: 'var(--primary)', color: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px var(--primary-glow)'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>task_alt</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>TaskFlow</span>
            <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>Smart Task Manager</span>
          </div>
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '14px',
            backgroundColor: isActive ? 'var(--primary-surface)' : 'transparent',
            color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)',
            fontWeight: isActive ? '700' : '500',
            borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
            textDecoration: 'none',
            transition: 'all 0.15s ease'
          })}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
            <span style={{ fontSize: '14px' }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '0 8px' }}>
        <button 
          className="btn-primary"
          onClick={() => openTaskModal()}
          style={{ 
            width: '100%', height: '48px', borderRadius: '9999px',
            backgroundColor: 'var(--primary)', color: '#ffffff',
            boxShadow: 'var(--shadow-fab)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontWeight: '700', fontSize: '14px', border: 'none', cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Add Task
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
