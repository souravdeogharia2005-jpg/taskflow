import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from '../components/Dashboard/WelcomeHeader.jsx';
import ProgressCard from '../components/Dashboard/ProgressCard.jsx';
import StatsCards from '../components/Dashboard/StatsCards.jsx';
import TodayTasks from '../components/Dashboard/TodayTasks.jsx';
import { useTasks } from '../hooks/useTasks.js';
import { getStats } from '../utils/taskUtils.js';

const Dashboard = () => {
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const stats = getStats(tasks);

  const handleTaskClick = (task) => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <WelcomeHeader tasksCount={stats.todayTasks.length - stats.todayCompleted} />
      <ProgressCard completed={stats.todayCompleted} total={stats.todayTasks.length} />
      <StatsCards total={stats.total} completed={stats.completed} pending={stats.pending} />

      {stats.overdue > 0 && (
        <div 
          onClick={() => navigate('/tasks?due=overdue')}
          style={{
            backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)',
            padding: '14px 18px', borderRadius: '18px', border: '1px solid var(--error)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: '800',
            marginBottom: '24px', cursor: 'pointer', boxShadow: 'var(--shadow-card-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>warning</span>
            <span>You have {stats.overdue} overdue task{stats.overdue !== 1 ? 's' : ''}! Tap to inspect.</span>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
        </div>
      )}

      <TodayTasks tasks={stats.todayTasks} onEdit={handleTaskClick} />
    </div>
  );
};
export default Dashboard;
