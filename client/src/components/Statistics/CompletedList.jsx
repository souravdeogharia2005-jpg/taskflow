import React from 'react';
import { formatDate } from '../../utils/dateUtils.js';

const CompletedList = ({ tasks }) => (
  <div className="card animate-in" style={{ padding: '0' }}>
    <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border)' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '700' }}>Recently Completed</h3>
    </div>
    <div style={{ padding: 'var(--space-2)' }}>
      {tasks.length === 0 ? (
        <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>No recent completed tasks</div>
      ) : (
        tasks.slice(0, 5).map(task => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--priority-low-bg)', color: 'var(--priority-low)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: '500', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{task.category}</div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{formatDate(task.updatedAt)}</div>
          </div>
        ))
      )}
    </div>
  </div>
);
export default CompletedList;
