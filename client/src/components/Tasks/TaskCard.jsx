import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';

const TaskCard = ({ task, onToggle, onClick }) => {
  const navigate = useNavigate();
  const { toggleTask, removeTask, toast } = useTaskContext();

  const handleToggle = (e) => {
    e.stopPropagation();
    if (onToggle) onToggle(task._id || task.id);
    else toggleTask(task._id || task.id);
  };

  const handleCardClick = () => {
    if (onClick) onClick(task);
    else navigate(`/tasks/${task._id || task.id}`);
  };

  return (
    <div className="task-card hover-card-lift" onClick={handleCardClick} style={{
      width: '100%', borderRadius: 'var(--radius-default)', marginBottom: '8px',
      backgroundColor: task.completed ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)', 
      padding: '16px', 
      boxShadow: task.completed ? 'none' : 'var(--shadow-card-sm)', 
      border: '1px solid var(--surface-container)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', 
      opacity: task.completed ? 0.8 : 1, cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <button 
          className="checkbox-pop"
          title={task.completed ? "Mark Incomplete" : "Mark Complete"}
          onClick={handleToggle}
          style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            backgroundColor: task.completed ? 'var(--success)' : 'var(--surface-container-high)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff',
            border: 'none', cursor: 'pointer', 
            boxShadow: task.completed ? '0 2px 8px rgba(36, 150, 63, 0.3)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            {task.completed ? 'check' : 'radio_button_unchecked'}
          </span>
        </button>
        
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.01em', 
            color: task.completed ? 'var(--secondary)' : 'var(--on-surface)', 
            textDecoration: task.completed ? 'line-through' : 'none', 
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '700' 
          }}>
            {task.title}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
            {task.category && (
              <span style={{ 
                fontSize: '10px', lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '800', textTransform: 'uppercase',
                color: task.completed ? 'var(--secondary)' : 'var(--primary)', 
                backgroundColor: task.completed ? 'var(--surface-container-high)' : 'var(--primary-surface)', 
                padding: '2px 8px', borderRadius: '6px' 
              }}>
                {task.category}
              </span>
            )}
            
            {task.priority === 'high' && (
              <span style={{ 
                fontSize: '10px', lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '800', textTransform: 'uppercase',
                color: '#ffffff', 
                backgroundColor: 'var(--primary)', 
                padding: '2px 8px', borderRadius: '6px',
                display: 'inline-flex', alignItems: 'center', gap: '2px'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>local_fire_department</span>
                High Priority
              </span>
            )}
            
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', lineHeight: '14px', color: 'var(--secondary)', fontWeight: '600' }}>
              {task.completed ? (
                <><span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--success)' }}>check_circle</span> Completed</>
              ) : (
                <><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span> {task.dueTime ? `Due ${task.dueTime}` : (task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()}` : 'No date')}</>
              )}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        title="Remove Task"
        onClick={(e) => { e.stopPropagation(); removeTask(task._id || task.id); }} 
        style={{ width: '32px', height: '32px', borderRadius: '50%', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete_outline</span>
      </button>
    </div>
  );
};

export default TaskCard;
