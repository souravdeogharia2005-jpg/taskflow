import React from 'react';
import { useTasks } from '../../hooks/useTasks.js';

const CalendarTask = ({ task, onClick }) => {
  const { categories } = useTasks();
  const cat = categories.find(c => c.name === task.category);

  return (
    <div onClick={() => onClick(task)} style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${cat?.color || 'var(--primary)'}`,
      padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '8px', cursor: 'pointer',
      boxShadow: 'var(--shadow-sm)', textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.7 : 1
    }}>
      <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--text)' }}>{task.title}</div>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{task.dueTime || 'All Day'}</div>
    </div>
  );
};
export default CalendarTask;
