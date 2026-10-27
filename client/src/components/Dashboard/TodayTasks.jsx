import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { getCategoryStats, getSubtaskProgress } from '../../utils/taskUtils';

const TodayTasks = ({ tasks, onEdit }) => {
  const { categories, toggleTask, removeTask, openTaskModal } = useTaskContext();
  const navigate = useNavigate();
  
  // Hero task: First incomplete high priority, or first incomplete, or first task
  const heroTask = tasks.length > 0 ? (
    tasks.find(t => !t.completed && t.priority === 'high') 
    || tasks.find(t => !t.completed) 
    || tasks[0]
  ) : null;
                
  const categoryStats = getCategoryStats(tasks, categories);
  const activeCategories = categoryStats.filter(c => c.total > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. In Progress Featured Section (ONLY shown if there is an active task) */}
      {heroTask && !heroTask.completed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>local_fire_department</span>
              <h2 style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.015em', fontWeight: '800', color: 'var(--on-surface)' }}>Top Priority • In Progress</h2>
            </div>
            <button onClick={() => navigate('/tasks')} style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0.02em', color: 'var(--primary)', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
          </div>
          
          {/* Featured Dark Hero Card with Zomato glow */}
          <div 
            onClick={() => onEdit(heroTask)}
            className="hero-card hover-card-lift"
            style={{ 
              position: 'relative', overflow: 'hidden', borderRadius: '24px', 
              backgroundColor: 'var(--inverse-surface)', color: '#ffffff', 
              padding: '20px', boxShadow: 'var(--shadow-card-lg)', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ position: 'absolute', right: '-32px', top: '-32px', width: '160px', height: '160px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', filter: 'blur(30px)', pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.04em', backgroundColor: 'rgba(14, 165, 233, 0.2)', color: '#38BDF8', padding: '4px 10px', borderRadius: '9999px', fontWeight: '800', textTransform: 'uppercase' }}>
                  {heroTask.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: '700' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>schedule</span>
                  <span>{heroTask.dueTime ? `Due ${heroTask.dueTime}` : (heroTask.dueDate ? `Due ${heroTask.dueDate}` : 'Active Today')}</span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '20px', lineHeight: '26px', letterSpacing: '-0.015em', color: '#ffffff', fontWeight: '800' }}>
                {heroTask.title}
              </h3>
              
              {heroTask.description && (
                <p style={{ fontSize: '13px', lineHeight: '18px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                  {heroTask.description}
                </p>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Subtask Progress</span>
                  <span style={{ color: 'var(--primary)', fontWeight: '800' }}>
                    {getSubtaskProgress(heroTask)}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '9999px', backgroundColor: 'var(--primary)', width: `${getSubtaskProgress(heroTask)}%`, transition: 'width 0.4s ease' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--success)' }}>task_alt</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>Tap to view subtasks & details</span>
                </div>
                
                {heroTask.priority === 'high' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(14, 165, 233, 0.25)', padding: '4px 10px', borderRadius: '9999px' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '14px' }}>local_fire_department</span>
                    <span style={{ fontSize: '10px', letterSpacing: '0.04em', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>High Priority</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Task Categories Section (ONLY shown if user has categorized tasks) */}
      {activeCategories.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.015em', fontWeight: '800', color: 'var(--on-surface)' }}>Task Categories</h2>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary)' }}>
              {activeCategories.length} active
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {activeCategories.map((cat) => {
              const percent = cat.total === 0 ? 0 : Math.round((cat.completed / cat.total) * 100);
              
              return (
                <div 
                  key={cat.id} 
                  onClick={() => navigate(`/tasks?category=${cat.name}`)}
                  className="hover-card-lift"
                  style={{ 
                    minWidth: '190px', borderRadius: '20px', backgroundColor: 'var(--surface-container-lowest)', 
                    padding: '16px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px', flexShrink: 0,
                    cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cat.icon && /\p{Extended_Pictographic}/u.test(cat.icon) ? (
                        <span style={{ fontSize: '20px' }}>{cat.icon}</span>
                      ) : (
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{cat.icon || 'folder'}</span>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)' }}>{percent}%</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--on-surface)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cat.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--secondary)', marginTop: '2px' }}>{cat.total} Tasks</p>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '9999px', backgroundColor: 'var(--surface-container-high)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: 'var(--primary)', borderRadius: '9999px', width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Today's Tasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '-0.015em', fontWeight: '800', color: 'var(--on-surface)' }}>Today's Tasks</h2>
            {tasks.length > 0 && (
              <span style={{ fontSize: '11px', color: 'var(--primary)', backgroundColor: 'var(--primary-surface)', padding: '2px 8px', borderRadius: '9999px', fontWeight: '800' }}>
                {tasks.filter(t => !t.completed).length} Pending
              </span>
            )}
          </div>
          {tasks.length > 0 && (
            <button onClick={() => navigate('/tasks')} style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Explore All
            </button>
          )}
        </div>
        
        {/* Zomato-Style Empty State when 0 tasks */}
        {tasks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', padding: '48px 24px', backgroundColor: 'var(--surface-container-lowest)', 
            borderRadius: '24px', boxShadow: 'var(--shadow-card-md)', border: '1px solid var(--surface-container)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              backgroundColor: 'var(--primary-surface)', color: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '18px', boxShadow: '0 8px 20px var(--primary-glow)'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>task_alt</span>
            </div>
            
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'var(--on-surface)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              No tasks scheduled yet
            </h3>
            
            <p style={{ fontSize: '13px', lineHeight: '20px', color: 'var(--secondary)', maxWidth: '360px', marginBottom: '24px' }}>
              Organize your day, prioritize your goals, and track your accomplishments in one place.
            </p>
            
            <button 
              onClick={() => openTaskModal()}
              style={{
                height: '46px', padding: '0 24px', borderRadius: '9999px',
                backgroundColor: 'var(--primary)', color: '#ffffff',
                boxShadow: 'var(--shadow-fab)', display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontWeight: '800', fontSize: '14px', border: 'none', cursor: 'pointer',
                transition: 'transform 0.15s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
              Create Your First Task
            </button>
          </div>
        ) : (
          /* Render Real Tasks */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => onEdit(task)} 
                className="hover-card-lift"
                style={{
                  width: '100%', borderRadius: '20px', 
                  backgroundColor: task.completed ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)', 
                  padding: '16px', 
                  boxShadow: task.completed ? 'none' : 'var(--shadow-card-sm)', 
                  border: '1px solid var(--surface-container)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', 
                  opacity: task.completed ? 0.8 : 1, cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  {/* Circular Checkbox with Zomato pop effect */}
                  <button 
                    title={task.completed ? "Mark Incomplete" : "Mark Complete"}
                    onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                    className="checkbox-pop"
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: task.completed ? 'var(--success)' : 'var(--surface-container-high)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff',
                      border: 'none', cursor: 'pointer', 
                      boxShadow: task.completed ? '0 2px 8px rgba(36, 150, 63, 0.3)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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
                      
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: 'var(--secondary)', fontWeight: '600' }}>
                        {task.completed ? (
                          <><span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--success)' }}>check_circle</span> Completed</>
                        ) : (
                          <><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span> {task.dueTime ? `Due ${task.dueTime}` : (task.dueDate ? `Due ${task.dueDate}` : 'Today')}</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Delete / options */}
                <button 
                  title="Delete Task"
                  onClick={(e) => { e.stopPropagation(); removeTask(task.id); }} 
                  style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer' 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete_outline</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default TodayTasks;
