import React, { useEffect, useRef } from 'react';
import { animateProgressBar } from '../../animations/chartAnimations.js';

const CategoryCard = ({ category, onClick, onDelete }) => {
  const barRef = useRef(null);
  const pct = category.total === 0 ? 0 : Math.round((category.completed / category.total) * 100);

  useEffect(() => {
    animateProgressBar(barRef.current, `${pct}%`);
  }, [pct]);

  return (
    <div onClick={() => onClick(category)} style={{
      backgroundColor: 'var(--surface-container-lowest)', borderRadius: '24px', padding: '20px', 
      boxShadow: '0 8px 25px rgba(30,50,80,0.04)', display: 'flex', flexDirection: 'column', 
      cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: category.color || 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {category.icon && /\p{Extended_Pictographic}/u.test(category.icon) ? (
            <span style={{ fontSize: '24px' }}>{category.icon}</span>
          ) : (
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{category.icon || 'folder'}</span>
          )}
        </div>
        
        {onDelete && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(category); }} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
          </button>
        )}
      </div>
      
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--on-surface)', marginBottom: '4px', letterSpacing: '-0.01em' }}>{category.name}</h3>
      <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '20px' }}>{category.total} tasks</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--on-surface-variant)' }}>Progress</span>
        <span style={{ fontSize: '12px', fontWeight: '700', color: category.color || 'var(--primary)' }}>{pct}%</span>
      </div>
      
      <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--surface-container-highest)', borderRadius: '9999px', overflow: 'hidden' }}>
        <div ref={barRef} style={{ width: '0%', height: '100%', backgroundColor: category.color || 'var(--primary)', borderRadius: '9999px' }} />
      </div>
    </div>
  );
};
export default CategoryCard;
