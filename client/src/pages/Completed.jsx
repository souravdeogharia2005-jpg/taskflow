import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/Tasks/TaskCard.jsx';
import ConfirmDialog from '../components/UI/ConfirmDialog.jsx';
import EmptyState from '../components/UI/EmptyState.jsx';
import { useTasks } from '../hooks/useTasks.js';
import { groupTasksByCompletedDate } from '../utils/dateUtils.js';

const Completed = () => {
  const { tasks, removeTask } = useTasks();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const completedTasks = tasks.filter(t => t.completed);
  const groups = groupTasksByCompletedDate(completedTasks);

  const handleClearAll = () => {
    completedTasks.forEach(t => removeTask(t.id));
    setConfirmOpen(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div>
          <h1 style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '-0.02em', color: 'var(--on-surface)', fontWeight: '800' }}>Completed Tasks</h1>
          <p style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '700', marginTop: '2px' }}>{completedTasks.length} tasks successfully completed</p>
        </div>
        {completedTasks.length > 0 && (
          <button 
            onClick={() => setConfirmOpen(true)}
            style={{ 
              height: '40px', padding: '0 18px', borderRadius: '9999px', 
              backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)', 
              display: 'flex', alignItems: 'center', gap: '8px', 
              border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '12px'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete_sweep</span>
            Clear All
          </button>
        )}
      </div>

      {completedTasks.length === 0 ? (
        <EmptyState 
          icon="check_circle"
          title="No completed tasks yet" 
          description="Check off tasks from your list and they will appear here with completion history."
          action={() => navigate('/tasks')}
          actionLabel="View My Tasks"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {Object.entries(groups).map(([label, groupTasks]) => {
            if (groupTasks.length === 0) return null;
            return (
              <div key={label}>
                <h3 style={{ fontSize: '13px', letterSpacing: '0.02em', textTransform: 'uppercase', fontWeight: '700', color: 'var(--on-surface-variant)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {label} 
                  <span style={{ fontSize: '11px', background: 'var(--surface-container-high)', color: 'var(--on-surface)', padding: '2px 8px', borderRadius: '9999px' }}>{groupTasks.length}</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {groupTasks.map(task => <TaskCard key={task.id} task={task} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleClearAll}
        title="Clear Completed Tasks"
        message="Are you sure you want to permanently delete all completed tasks? This cannot be undone."
        confirmLabel="Clear All" danger />
    </div>
  );
};
export default Completed;
