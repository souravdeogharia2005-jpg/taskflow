import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext.jsx';

const MobileNav = () => {
  const { openTaskModal } = useTaskContext();
  
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-content">
        <NavLink to="/" end className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>dashboard</span>
          <span style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', marginTop: '4px' }}>Home</span>
        </NavLink>
        
        <NavLink to="/calendar" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>calendar_today</span>
          <span style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', marginTop: '4px' }}>Calendar</span>
        </NavLink>
        
        <div className="mobile-fab-container">
          <button className="fab" onClick={() => openTaskModal()}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
          </button>
        </div>
        
        <NavLink to="/tasks" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>task_alt</span>
          <span style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', marginTop: '4px' }}>Tasks</span>
        </NavLink>
        
        <NavLink to="/statistics" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>bar_chart</span>
          <span style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', marginTop: '4px' }}>Stats</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNav;
