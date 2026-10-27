import React from 'react';
import { useTaskContext } from '../../context/TaskContext';

const TaskFilters = ({ filters, setFilters }) => {
  const { categories } = useTaskContext();

  const handleStatusClick = (status) => setFilters(f => ({ ...f, status }));
  const handleCategoryClick = (cat) => setFilters(f => ({ ...f, category: f.category === cat ? 'all' : cat }));
  const handlePriorityClick = (prio) => setFilters(f => ({ ...f, priority: f.priority === prio ? 'all' : prio }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '8px' }}>
      {/* Status tabs */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '9999px', padding: '4px', width: 'fit-content', border: '1px solid var(--surface-container)', boxShadow: 'var(--shadow-card-sm)' }}>
        {['all', 'pending', 'completed'].map(status => {
          const isActive = filters.status === status;
          return (
            <button 
              key={status} 
              onClick={() => handleStatusClick(status)}
              style={{ 
                padding: '6px 18px', borderRadius: '9999px', fontSize: '13px', lineHeight: '18px', 
                backgroundColor: isActive ? 'var(--primary)' : 'transparent', 
                color: isActive ? '#ffffff' : 'var(--secondary)', 
                boxShadow: isActive ? 'var(--shadow-fab)' : 'none', 
                border: 'none', fontWeight: '800', cursor: 'pointer', textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Chips scroll container */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        
        {/* Categories */}
        {categories.map(c => {
          const isActive = filters.category === c.name;
          return (
            <button
              key={c.id}
              onClick={() => handleCategoryClick(c.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                padding: '6px 14px', borderRadius: '9999px', 
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--surface-container)',
                backgroundColor: isActive ? 'var(--primary-surface)' : 'var(--surface-container-lowest)',
                color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)',
                fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                boxShadow: 'var(--shadow-card-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              {isActive && <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>check</span>}
              {!isActive && <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>{c.icon || 'folder'}</span>}
              {c.name}
            </button>
          );
        })}

        <div style={{ width: '1px', backgroundColor: 'var(--surface-container-high)', margin: '0 4px' }}></div>

        {/* Priorities */}
        {['high', 'medium', 'low'].map(prio => {
          const isActive = filters.priority === prio;
          const prioColor = prio === 'high' ? 'var(--primary)' : (prio === 'medium' ? 'var(--warning)' : 'var(--secondary)');
          const prioBg = prio === 'high' ? 'var(--primary-surface)' : (prio === 'medium' ? 'var(--warning-surface)' : 'var(--surface-container-lowest)');
          
          return (
            <button
              key={prio}
              onClick={() => handlePriorityClick(prio)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                padding: '6px 14px', borderRadius: '9999px', 
                border: isActive ? `1px solid ${prioColor}` : '1px solid var(--surface-container)',
                backgroundColor: isActive ? prioBg : 'var(--surface-container-lowest)',
                color: isActive ? prioColor : 'var(--on-surface-variant)',
                fontSize: '12px', fontWeight: '800', cursor: 'pointer', textTransform: 'capitalize',
                boxShadow: 'var(--shadow-card-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              {isActive && <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>check</span>}
              {!isActive && <span className="material-symbols-outlined" style={{ fontSize: '15px', color: prioColor }}>flag</span>}
              {prio === 'high' ? 'Must Do' : prio}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilters;
