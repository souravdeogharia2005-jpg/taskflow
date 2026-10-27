import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { getWeeklyData } from '../utils/taskUtils';

const Statistics = () => {
  const { tasks, toast } = useTaskContext();
  const navigate = useNavigate();
  const [range, setRange] = useState('weekly'); // 'weekly' | 'monthly' | 'yearly'

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const total = tasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Real weekly data for Mon - Sun
  const weeklyData = getWeeklyData(tasks);
  const maxCompleted = Math.max(...weeklyData.map(d => d.completed), 1);
  const totalWeekCompleted = weeklyData.reduce((acc, d) => acc + d.completed, 0);
  const avgPerDay = (totalWeekCompleted / 7).toFixed(1);

  // SVG chart points calculation
  // ViewBox: 340 x 160. X spans from 20 to 320 (gap = 50). Y spans from 140 (0 completed) to 30 (maxCompleted)
  const chartPoints = weeklyData.map((d, i) => {
    const x = 20 + i * 50;
    const y = totalWeekCompleted === 0 ? 130 : 130 - (d.completed / maxCompleted) * 90;
    return { x, y, count: d.completed, day: d.day };
  });

  // Construct SVG path
  const pathD = chartPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = chartPoints[i - 1];
    const cx1 = (prev.x + pt.x) / 2;
    return `${acc} C ${cx1} ${prev.y}, ${cx1} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${chartPoints[chartPoints.length - 1].x} 150 L ${chartPoints[0].x} 150 Z`;

  // Real completed tasks
  const completedList = tasks.filter(t => t.completed).slice(0, 5);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div>
          <h1 style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '-0.02em', color: 'var(--on-surface)', fontWeight: '800' }}>
            Productivity Insights
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '700', marginTop: '2px' }}>
            {completed} of {total} tasks completed ({completionRate}%)
          </p>
        </div>

        {/* Range Selector */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '9999px', padding: '4px', border: '1px solid var(--surface-container)', boxShadow: 'var(--shadow-card-sm)' }}>
          {['weekly', 'monthly', 'yearly'].map(r => (
            <button 
              key={r}
              onClick={() => { setRange(r); if (r !== 'weekly') toast(`${r.charAt(0).toUpperCase() + r.slice(1)} aggregates calculated from your tasks`); }}
              style={{ 
                padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', 
                backgroundColor: range === r ? 'var(--primary)' : 'transparent', 
                color: range === r ? '#ffffff' : 'var(--on-surface-variant)', 
                boxShadow: range === r ? 'var(--shadow-fab)' : 'none', 
                border: 'none', fontWeight: '800', cursor: 'pointer', textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      {/* 2-Column Summary Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ backgroundColor: 'var(--surface-container-lowest)', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase' }}>Completed Tasks</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'var(--success-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '36px', lineHeight: '42px', fontWeight: '900', color: 'var(--on-surface)' }}>{completed}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', backgroundColor: 'var(--success-surface)', padding: '4px 10px', borderRadius: '9999px' }}>
              <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '800' }}>
                {total > 0 ? `${completionRate}% Done` : '0% (Ready to start)'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-container-lowest)', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase' }}>Pending in Queue</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'var(--warning-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>hourglass_top</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '36px', lineHeight: '42px', fontWeight: '900', color: 'var(--on-surface)' }}>{pending}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', backgroundColor: 'var(--warning-surface)', padding: '4px 10px', borderRadius: '9999px' }}>
              <span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: '800' }}>
                {pending} Remaining
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sky Blue Hero Chart Section */}
      <section style={{ 
        position: 'relative', backgroundColor: 'var(--primary)', borderRadius: '26px', 
        padding: '24px', color: '#ffffff', boxShadow: 'var(--shadow-card-lg)', overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '180px', height: '180px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', left: '-30px', top: '-30px', width: '140px', height: '140px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(24px)', pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '900', color: '#ffffff' }}>Weekly Productivity</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: '2px' }}>
              Avg. {avgPerDay} completed / day ({totalWeekCompleted} this week)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', borderRadius: '9999px', padding: '4px 10px', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: '800' }}>Current Week</span>
          </div>
        </div>
        
        {/* Dynamic Line Chart */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '8px', paddingBottom: '8px' }}>
          <div style={{ position: 'relative', width: '100%', height: '160px' }}>
            <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="none" viewBox="0 0 340 160">
              <defs>
                <linearGradient id="skyChartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area */}
              <path d={areaD} fill="url(#skyChartGradient)" />

              {/* Main Line */}
              <path d={pathD} fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data points */}
              {chartPoints.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" />
                  <circle cx={pt.x} cy={pt.y} r="2.5" fill="var(--primary)" />
                </g>
              ))}
            </svg>
          </div>

          {/* Day Labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', paddingTop: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '800' }}>
            {weeklyData.map((d, i) => (
              <span key={i} style={{ color: d.completed > 0 ? '#ffffff' : 'rgba(255,255,255,0.7)' }}>
                {d.day} ({d.completed})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Last Completed Tasks */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--on-surface)' }}>Recently Completed</h2>
          {completedList.length > 0 && (
            <button onClick={() => navigate('/completed')} style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}>
              View All ({completed})
            </button>
          )}
        </div>

        {completedList.length === 0 ? (
          <div style={{ 
            textAlign: 'center', padding: '36px 20px', backgroundColor: 'var(--surface-container-lowest)', 
            borderRadius: '20px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--secondary)', opacity: 0.7 }}>
              check_circle
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--on-surface)' }}>No completed tasks yet</h4>
            <p style={{ fontSize: '12px', color: 'var(--secondary)' }}>Check off tasks from your list to see your completion history recorded here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {completedList.map(item => (
              <div 
                key={item.id}
                onClick={() => navigate(`/tasks/${item.id}`)}
                style={{ 
                  backgroundColor: 'var(--surface-container-lowest)', borderRadius: '18px', padding: '16px', 
                  boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--success-surface)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--secondary)', marginTop: '2px' }}>
                      {item.category} • Finished recently
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontSize: '20px' }}>chevron_right</span>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Statistics;
