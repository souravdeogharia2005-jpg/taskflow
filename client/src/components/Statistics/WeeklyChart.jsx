import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WeeklyChart = ({ data }) => {
  const chartRef = useRef(null);
  const maxVal = Math.max(...data.map(d => Math.max(d.completed, d.created)), 1);

  useEffect(() => {
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.chart-bar');
      gsap.fromTo(bars, { height: 0 }, { height: (i, el) => el.dataset.height, duration: 1, stagger: 0.1, ease: 'power3.out' });
    }
  }, [data]);

  return (
    <div className="card animate-in" style={{ padding: 'var(--space-6)' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-6)' }}>Weekly Activity</h3>
      <div ref={chartRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '8px' }}>
        {data.map(d => (
          <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100%', width: '100%', justifyContent: 'center' }}>
              <div className="chart-bar" data-height={`${(d.created / maxVal) * 100}%`} style={{ width: '12px', backgroundColor: 'var(--surface-2)', borderRadius: '4px 4px 0 0', position: 'relative' }} title={`Created: ${d.created}`} />
              <div className="chart-bar" data-height={`${(d.completed / maxVal) * 100}%`} style={{ width: '12px', backgroundColor: 'var(--primary)', borderRadius: '4px 4px 0 0', position: 'relative' }} title={`Completed: ${d.completed}`} />
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: '500' }}>{d.day}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--surface-2)' }} /> Created</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} /> Completed</div>
      </div>
    </div>
  );
};
export default WeeklyChart;
