import React from 'react';

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
const mockTasks = [
  { time: '09:00', title: 'Daily Standup', category: 'Work', type: 'normal' },
  { time: '11:00', title: 'Design Review', category: 'Work', type: 'hero' },
];

const CalendarGrid = () => (
  <div style={{ marginTop: '24px' }}>
    {timeSlots.map(time => {
      const task = mockTasks.find(t => t.time === time);
      
      return (
        <div key={time} className="timeline-row">
          <div className="timeline-time">{time}</div>
          <div className="timeline-content">
            {task ? (
              task.type === 'hero' ? (
                <div className="hero-card" style={{ padding: '16px', borderRadius: '16px' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{task.title}</h4>
                  <div style={{ fontSize: 'var(--text-label-sm)', opacity: 0.8 }}>11:00 AM - 12:30 PM</div>
                </div>
              ) : (
                <div className="card timeline-task" style={{ padding: '16px', borderRadius: '16px' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{task.title}</h4>
                  <div style={{ fontSize: 'var(--text-label-sm)', color: 'var(--on-surface-variant)' }}>09:00 AM - 09:45 AM</div>
                </div>
              )
            ) : (
              <div style={{ padding: '16px', color: 'var(--on-surface-variant)', fontStyle: 'italic', fontSize: 'var(--text-label-sm)' }}>
                Free
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default CalendarGrid;
