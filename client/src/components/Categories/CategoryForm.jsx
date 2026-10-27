import React, { useState } from 'react';
import Button from '../UI/Button.jsx';
import { generateId } from '../../utils/id.js';

const emojis = ['💼', '📚', '🏠', '🛒', '💪', '📌', '🎮', '✈️', '🎨', '🎵', '🌿', '💡'];
const colors = ['#0284C7', '#0EA5E9', '#38BDF8', '#6366F1', '#0D9488', '#10B981', '#F59E0B', '#64748B'];

const CategoryForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(emojis[0]);
  const [color, setColor] = useState(colors[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }
    onSubmit({ id: generateId(), name: name.trim(), icon, color });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Category Name *</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => { setName(e.target.value); setError(''); }}
          style={{ 
            width: '100%', height: '46px', padding: '0 16px', borderRadius: '14px', 
            border: `1px solid ${error ? 'var(--primary)' : 'var(--surface-container)'}`, 
            background: 'var(--surface-container-lowest)', color: 'var(--on-surface)',
            fontSize: '14px', fontWeight: '600', outline: 'none'
          }}
          placeholder="e.g. Hobbies, Work, Fitness..." 
          autoFocus 
        />
        {error && <span style={{ color: 'var(--primary)', fontSize: '11px', marginTop: '4px', display: 'block', fontWeight: '700' }}>{error}</span>}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '8px' }}>Select Icon</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {emojis.map(e => (
            <button 
              key={e} 
              type="button" 
              onClick={() => setIcon(e)}
              style={{ 
                width: '42px', height: '42px', borderRadius: '12px', 
                border: icon === e ? '2px solid var(--primary)' : '1px solid var(--surface-container)', 
                background: icon === e ? 'var(--primary-surface)' : 'var(--surface-container-lowest)', 
                fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '8px' }}>Theme Color</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {colors.map(c => (
            <button 
              key={c} 
              type="button" 
              onClick={() => setColor(c)}
              style={{ 
                width: '34px', height: '34px', borderRadius: '50%', backgroundColor: c, 
                border: color === c ? '3px solid #ffffff' : '2px solid transparent', 
                boxShadow: color === c ? `0 0 0 2px ${c}, 0 4px 10px rgba(0,0,0,0.2)` : 'none',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }} 
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--surface-container)' }}>
        <button 
          type="button" 
          onClick={onCancel}
          style={{ height: '44px', padding: '0 20px', borderRadius: '9999px', backgroundColor: 'transparent', color: 'var(--secondary)', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          style={{ 
            height: '44px', padding: '0 24px', borderRadius: '9999px', 
            backgroundColor: 'var(--primary)', color: '#ffffff', 
            boxShadow: 'var(--shadow-fab)', border: 'none', fontWeight: '800', fontSize: '13px', cursor: 'pointer' 
          }}
        >
          Create Category
        </button>
      </div>
    </form>
  );
};
export default CategoryForm;
