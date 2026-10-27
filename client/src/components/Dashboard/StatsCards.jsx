import React from 'react';

const StatsCards = ({ total, completed, pending }) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginBottom: '24px' }}>
      
      {/* Total Tasks */}
      <div className="stat-card hover-card-lift" style={{
        borderRadius: 'var(--radius-stat)', backgroundColor: 'var(--surface-container-lowest)',
        padding: '16px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--surface-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>assignment</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase' }}>All Items</span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '24px', lineHeight: '28px', fontWeight: '900', color: 'var(--on-surface)' }}>{total}</div>
          <p style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>Total Tasks</p>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="stat-card hover-card-lift" style={{
        borderRadius: 'var(--radius-stat)', backgroundColor: 'var(--surface-container-lowest)',
        padding: '16px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--success-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          </div>
          {total > 0 && (
            <span style={{ fontSize: '10px', color: 'var(--success)', backgroundColor: 'var(--success-surface)', padding: '2px 6px', borderRadius: '9999px', fontWeight: '800' }}>
              {completionRate}%
            </span>
          )}
        </div>
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '24px', lineHeight: '28px', fontWeight: '900', color: 'var(--on-surface)' }}>{completed}</div>
          <p style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>Completed</p>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="stat-card hover-card-lift" style={{
        borderRadius: 'var(--radius-stat)', backgroundColor: 'var(--surface-container-lowest)',
        padding: '16px', boxShadow: 'var(--shadow-card-sm)', border: '1px solid var(--surface-container)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--warning-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>hourglass_top</span>
          </div>
          {pending > 0 && (
            <span style={{ fontSize: '10px', color: 'var(--warning)', backgroundColor: 'var(--warning-surface)', padding: '2px 6px', borderRadius: '9999px', fontWeight: '800' }}>
              Active
            </span>
          )}
        </div>
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '24px', lineHeight: '28px', fontWeight: '900', color: 'var(--on-surface)' }}>{pending}</div>
          <p style={{ fontSize: '11px', lineHeight: '14px', fontWeight: '700', color: 'var(--secondary)', marginTop: '4px' }}>In Progress</p>
        </div>
      </div>

    </div>
  );
};

export default StatsCards;
