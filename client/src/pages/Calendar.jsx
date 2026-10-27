import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const Calendar = () => {
  const { tasks, toggleTask, openTaskModal, toast } = useTaskContext();
  const navigate = useNavigate();

  // Selected date state (defaults to today)
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });

  // Calculate the 7-day strip centered on selectedDate or starting from current week
  const getDaysOfWeek = (baseDate) => {
    const days = [];
    const curr = new Date(baseDate);
    const dayOfWeek = curr.getDay(); // 0 is Sun
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(curr);
    monday.setDate(curr.getDate() + distanceToMonday);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push({
        dayName: dayNames[i],
        dateNum: d.getDate(),
        fullDate: d,
        isoString: d.toISOString().slice(0, 10),
      });
    }
    return days;
  };

  const daysOfWeek = getDaysOfWeek(selectedDate);
  const selectedIso = selectedDate.toISOString().slice(0, 10);

  // Filter real tasks for the selected date
  const dayTasks = tasks.filter(t => t.dueDate === selectedIso);

  const monthYearLabel = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const selectedDayLabel = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const isToday = new Date().toISOString().slice(0, 10) === selectedIso;

  const navigateWeek = (direction) => {
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + direction * 7);
      return next;
    });
  };

  const defaultSlots = [
    { time: '09:00 AM', label: 'Morning Focus & Kickoff' },
    { time: '11:00 AM', label: 'Deep Work Session' },
    { time: '01:00 PM', label: 'Lunch Break & Recharge', isBreak: true },
    { time: '02:30 PM', label: 'Afternoon Deliverables' },
    { time: '04:30 PM', label: 'Review & Sync' },
    { time: '06:00 PM', label: 'Daily Wrap-up' }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header with Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '-0.02em', color: 'var(--on-surface)', fontWeight: '800' }}>
            Schedule & Planner
          </h1>
          <span style={{ fontSize: '12px', lineHeight: '16px', color: 'var(--secondary)', fontWeight: '700', marginTop: '2px' }}>
            {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''} scheduled for {isToday ? 'today' : 'this date'}
          </span>
        </div>

        {/* Month Selector Pill with Active Chevrons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--surface-container-lowest)', padding: '6px 14px', borderRadius: '9999px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)' }}>
          <button 
            title="Previous Week"
            onClick={() => navigateWeek(-1)} 
            style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--on-surface-variant)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
          </button>
          
          <span style={{ fontSize: '12px', lineHeight: '16px', color: 'var(--on-surface)', padding: '0 6px', fontWeight: '800', whiteSpace: 'nowrap' }}>
            {monthYearLabel}
          </span>
          
          <button 
            title="Next Week"
            onClick={() => navigateWeek(1)} 
            style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--on-surface-variant)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
          </button>
        </div>
      </div>

      {/* Date Strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {daysOfWeek.map(d => {
          const isActive = d.isoString === selectedIso;
          const hasTasksOnDay = tasks.some(t => t.dueDate === d.isoString);

          return (
            <button 
              key={d.isoString} 
              className="calendar-day-btn"
              onClick={() => setSelectedDate(d.fullDate)}
              style={{ 
                flex: 1, minWidth: '54px', padding: isActive ? '14px 0' : '10px 0', 
                borderRadius: isActive ? '9999px' : '18px', 
                backgroundColor: isActive ? 'var(--primary)' : 'var(--surface-container-lowest)', 
                color: isActive ? '#ffffff' : 'var(--on-surface-variant)', 
                boxShadow: isActive ? 'var(--shadow-fab)' : 'var(--shadow-card-sm)', 
                border: '1px solid var(--surface-container)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: '800', color: isActive ? '#ffffff' : 'var(--secondary)' }}>
                {d.dayName}
              </span>
              <span style={{ fontSize: '16px', fontWeight: '900', marginTop: '2px', color: isActive ? '#ffffff' : 'var(--on-surface)' }}>
                {d.dateNum < 10 ? `0${d.dateNum}` : d.dateNum}
              </span>
              {hasTasksOnDay && (
                <span style={{ 
                  width: '5px', height: '5px', borderRadius: '50%', 
                  backgroundColor: isActive ? '#ffffff' : 'var(--primary)', 
                  position: 'absolute', bottom: '6px' 
                }}></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Summary Ribbon */}
      <div style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '14px 18px', backgroundColor: 'var(--surface-container-lowest)', 
        borderRadius: '20px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
          <span style={{ fontSize: '13px', color: 'var(--on-surface)', fontWeight: '800' }}>
            {selectedDayLabel} {isToday && '(Today)'}
          </span>
        </div>
        <button 
          onClick={() => openTaskModal({ dueDate: selectedIso })}
          style={{ 
            fontSize: '11px', padding: '6px 14px', borderRadius: '9999px', 
            backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', 
            fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' 
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
          Add Task for Day
        </button>
      </div>

      {/* Timeline Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        {dayTasks.length > 0 ? (
          /* Real Tasks on Selected Day */
          dayTasks.map(task => (
            <div 
              key={task.id}
              onClick={() => navigate(`/tasks/${task.id}`)}
              style={{ 
                display: 'grid', gridTemplateColumns: '72px 1fr', gap: '12px', alignItems: 'center',
                backgroundColor: 'var(--surface-container-lowest)', borderRadius: '20px', padding: '16px',
                boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)', cursor: 'pointer'
              }}
            >
              <div style={{ textAlign: 'right', paddingRight: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '800', whiteSpace: 'nowrap' }}>
                  {task.dueTime || 'All Day'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                    style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      backgroundColor: task.completed ? 'var(--success)' : 'var(--surface-container-high)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff', border: 'none', cursor: 'pointer', flexShrink: 0
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                      {task.completed ? 'check' : 'radio_button_unchecked'}
                    </span>
                  </button>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', fontWeight: '800' }}>
                        {task.category}
                      </span>
                      {task.priority === 'high' && (
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '800' }}>
                          Must Do
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: task.completed ? 'var(--secondary)' : 'var(--on-surface)', textDecoration: task.completed ? 'line-through' : 'none', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {task.title}
                    </h3>
                  </div>
                </div>

                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontSize: '20px' }}>
                  chevron_right
                </span>
              </div>
            </div>
          ))
        ) : (
          /* Clean Slate / Empty Calendar Schedule */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Friendly Empty Banner */}
            <div style={{ 
              textAlign: 'center', padding: '32px 20px', backgroundColor: 'var(--surface-container-lowest)', 
              borderRadius: '24px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '42px', color: 'var(--primary)', opacity: 0.9 }}>
                event_available
              </span>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--on-surface)' }}>
                No tasks scheduled for this day
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--secondary)', maxWidth: '340px' }}>
                Your schedule is clear. Click any time slot below to schedule a task into your day.
              </p>
            </div>

            {/* Time Slot Row Bookings */}
            {defaultSlots.map(slot => (
              <div 
                key={slot.time}
                onClick={() => openTaskModal({ dueDate: selectedIso, dueTime: slot.time })}
                style={{ 
                  display: 'grid', gridTemplateColumns: '72px 1fr', gap: '12px', alignItems: 'center',
                  backgroundColor: slot.isBreak ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)',
                  borderRadius: '18px', padding: '14px 16px',
                  boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
                  cursor: 'pointer', transition: 'transform 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ textAlign: 'right', paddingRight: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '800', whiteSpace: 'nowrap' }}>
                    {slot.time}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: slot.isBreak ? 'var(--secondary)' : 'var(--on-surface)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: slot.isBreak ? 'var(--warning)' : 'var(--primary)' }}>
                      {slot.isBreak ? 'coffee' : 'schedule'}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '700', fontStyle: slot.isBreak ? 'italic' : 'normal' }}>
                      {slot.label}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', 
                    fontWeight: '800', color: 'var(--primary)', backgroundColor: 'var(--primary-surface)', 
                    padding: '4px 10px', borderRadius: '9999px' 
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
                    Schedule
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Calendar;
