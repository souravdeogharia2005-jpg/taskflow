import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: 'dashboard' },
  { to: '/tasks', icon: 'task_alt' },
  { to: '/calendar', icon: 'calendar_today' },
  { to: '/categories', icon: 'folder_open' },
  { to: '/statistics', icon: 'bar_chart' },
  { to: '/completed', icon: 'done_all' },
  { to: '/settings', icon: 'settings' },
];

const IconSidebar = () => (
  <aside className="icon-sidebar">
    <div style={{ paddingBottom: '16px' }}>
      <span className="material-symbols-outlined" style={{ color: 'var(--primary-container)', fontSize: '28px' }}>check_circle</span>
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
      {navItems.map(item => (
        <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%',
          backgroundColor: isActive ? 'var(--primary-container)' : 'transparent',
          color: isActive ? 'var(--on-primary-container)' : 'var(--on-surface-variant)',
          textDecoration: 'none'
        })}>
          <span className="material-symbols-outlined">{item.icon}</span>
        </NavLink>
      ))}
    </nav>
    <button className="btn-icon" style={{ backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)' }}>
      <span className="material-symbols-outlined">add</span>
    </button>
  </aside>
);

export default IconSidebar;
