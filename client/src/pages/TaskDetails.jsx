import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { getSubtaskProgress } from '../utils/taskUtils';
import { formatDate } from '../utils/dateUtils';
import { generateId } from '../utils/id';
import EmptyState from '../components/UI/EmptyState';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, toggleTask, toggleSubtaskItem, editTask, removeTask, openTaskModal, toast } = useTaskContext();
  const [newSubtask, setNewSubtask] = useState('');
  
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <EmptyState 
          icon="task_alt"
          title="Task not found"
          description="This task might have been deleted or does not exist."
          action={() => navigate('/tasks')}
          actionLabel="Return to My Tasks"
        />
      </div>
    );
  }

  const progress = getSubtaskProgress(task);
  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    const updatedSubtasks = [...(task.subtasks || []), { id: generateId(), title: newSubtask.trim(), completed: false }];
    editTask(task.id, { subtasks: updatedSubtasks });
    setNewSubtask('');
    toast('Subtask added!');
  };

  const handleDelete = () => {
    removeTask(task.id);
    navigate('/tasks');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Back button row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              color: 'var(--on-surface)', backgroundColor: 'var(--surface-container-lowest)', 
              boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)', cursor: 'pointer' 
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back_ios_new</span>
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Task Details</h1>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => openTaskModal(task)}
            title="Edit Task"
            style={{ 
              height: '38px', padding: '0 16px', borderRadius: '9999px', backgroundColor: 'var(--surface-container-lowest)', 
              color: 'var(--on-surface)', border: '1px solid var(--surface-container)', boxShadow: 'var(--shadow-card-sm)',
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' 
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
            Edit
          </button>

          <button 
            onClick={handleDelete}
            title="Delete Task"
            style={{ 
              width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--error-container)', 
              color: 'var(--on-error-container)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
          </button>
        </div>
      </div>

      {/* Dark Hero Section with Zomato glow */}
      <section style={{ 
        position: 'relative', backgroundColor: 'var(--inverse-surface)', color: 'var(--inverse-on-surface)', 
        borderRadius: '26px', padding: '24px', boxShadow: 'var(--shadow-card-lg)', overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '180px', height: '180px', backgroundColor: 'var(--primary-glow)', borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(14, 165, 233, 0.2)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#38BDF8' }}>folder</span>
              <span style={{ fontSize: '11px', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#38BDF8', fontWeight: '800' }}>{task.category}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '700' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>schedule</span>
              <span>{task.dueTime ? `Due ${task.dueTime}` : 'All day'}</span>
            </div>
          </div>
          
          <h2 style={{ fontSize: '26px', lineHeight: '32px', letterSpacing: '-0.02em', color: '#ffffff', fontWeight: '800' }}>
            {task.title}
          </h2>

          {task.description && (
            <p style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              {task.description}
            </p>
          )}
          
          {/* Progress bar */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>trending_up</span>
                Completion Progress
              </span>
              <span style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: '800' }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: 'var(--primary)', borderRadius: '9999px', boxShadow: '0 0 12px var(--primary-glow)', width: `${progress}%`, transition: 'width 0.4s ease' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '700' }}>
              <span>{completedSubtasks} of {totalSubtasks} subtasks completed</span>
              <span style={{ color: progress === 100 ? 'var(--success)' : '#ffffff' }}>{progress === 100 ? 'Completed' : 'In progress'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ backgroundColor: 'var(--surface-container-lowest)', padding: '18px', borderRadius: '20px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'var(--primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_today</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: '800' }}>Due Date</span>
          <p style={{ fontSize: '16px', color: 'var(--on-surface)', marginTop: '2px', fontWeight: '800' }}>{task.dueDate ? formatDate(task.dueDate) : 'No date set'}</p>
          <span style={{ fontSize: '12px', color: 'var(--secondary)', marginTop: '2px', display: 'block' }}>{task.dueTime ? `At ${task.dueTime}` : 'Flexible timing'}</span>
        </div>

        <div style={{ backgroundColor: 'var(--surface-container-lowest)', padding: '18px', borderRadius: '20px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'var(--primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>local_fire_department</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: '800' }}>Priority Order</span>
          <div style={{ marginTop: '6px' }}>
            {task.priority === 'high' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'var(--primary)', color: '#ffffff', fontSize: '11px', fontWeight: '800' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>local_fire_department</span>
                High Priority
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', fontSize: '11px', fontWeight: '800', textTransform: 'capitalize' }}>
                {task.priority} Priority
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subtasks Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <div>
            <h3 style={{ fontSize: '18px', color: 'var(--on-surface)', fontWeight: '800' }}>Subtasks & Checklist</h3>
            <p style={{ fontSize: '12px', color: 'var(--secondary)' }}>Break down into actionable steps</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
            <span style={{ fontSize: '12px', fontWeight: '800' }}>{completedSubtasks} of {totalSubtasks} done</span>
          </div>
        </div>
        
        {/* Subtask items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {task.subtasks?.map((st) => (
            <div 
              key={st.id} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', 
                backgroundColor: 'var(--surface-container-lowest)', borderRadius: '18px', 
                boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)' 
              }}
            >
              <button 
                onClick={() => toggleSubtaskItem(task.id, st.id)}
                style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: st.completed ? 'var(--success)' : 'var(--surface-container-high)',
                  color: '#ffffff', border: 'none', cursor: 'pointer'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  {st.completed ? 'check' : 'radio_button_unchecked'}
                </span>
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ 
                  fontSize: '14px', fontWeight: '700', 
                  color: st.completed ? 'var(--secondary)' : 'var(--on-surface)', 
                  textDecoration: st.completed ? 'line-through' : 'none' 
                }}>
                  {st.title}
                </span>
              </div>

              <span style={{ 
                fontSize: '10px', fontWeight: '800', 
                color: st.completed ? 'var(--success)' : 'var(--secondary)', 
                backgroundColor: st.completed ? 'var(--success-surface)' : 'var(--surface-container)', 
                padding: '2px 8px', borderRadius: '9999px', textTransform: 'uppercase' 
              }}>
                {st.completed ? 'Done' : 'Active'}
              </span>
            </div>
          ))}

          {(!task.subtasks || task.subtasks.length === 0) && (
            <div style={{ padding: '24px', color: 'var(--secondary)', textAlign: 'center', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '18px', border: '1px dashed var(--surface-container)' }}>
              No subtasks added yet. Add steps below!
            </div>
          )}

          {/* Quick Add Subtask Input */}
          <form onSubmit={handleAddSubtask} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <input 
              type="text" 
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Add next subtask step..."
              style={{ 
                flex: 1, height: '44px', padding: '0 16px', borderRadius: '14px',
                border: '1px solid var(--surface-container)', backgroundColor: 'var(--surface-container-lowest)',
                color: 'var(--on-surface)', fontSize: '13px', outline: 'none'
              }}
            />
            <button 
              type="submit"
              style={{ 
                height: '44px', padding: '0 18px', borderRadius: '14px',
                backgroundColor: 'var(--primary-surface)', color: 'var(--primary)',
                border: 'none', fontWeight: '800', fontSize: '13px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Completion Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '8px' }}>
        <button 
          onClick={() => toggleTask(task.id)}
          style={{ 
            flex: 1, height: '52px', padding: '0 24px', borderRadius: '9999px', 
            backgroundColor: task.completed ? 'var(--secondary)' : 'var(--primary)', 
            color: '#ffffff', 
            boxShadow: task.completed ? 'none' : 'var(--shadow-fab)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '15px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
            {task.completed ? 'replay' : 'check_circle'}
          </span>
          <span>
            {task.completed ? 'Mark Active Again' : 'Mark as Completed 🎉'}
          </span>
        </button>
      </div>

    </div>
  );
};

export default TaskDetails;
