import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext.jsx';
import { validateTask } from '../../utils/validation.js';
import { generateId } from '../../utils/id.js';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const { categories } = useTaskContext();
  const [data, setData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || categories[0]?.name || 'Work',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate || '',
    dueTime: initialData?.dueTime || '',
    subtasks: initialData?.subtasks || [],
  });
  const [errors, setErrors] = useState({});
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    setData({
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || categories[0]?.name || 'Work',
      priority: initialData?.priority || 'medium',
      dueDate: initialData?.dueDate || '',
      dueTime: initialData?.dueTime || '',
      subtasks: initialData?.subtasks || [],
    });
    setErrors({});
  }, [initialData, categories]);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    setData(prev => ({ ...prev, subtasks: [...prev.subtasks, { id: generateId(), title: newSubtask.trim(), completed: false }] }));
    setNewSubtask('');
  };

  const handleRemoveSubtask = (id) => {
    setData(prev => ({ ...prev, subtasks: prev.subtasks.filter(s => s.id !== id) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: errs } = validateTask(data);
    if (!valid) return setErrors(errs);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Title */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Task Title *</label>
        <input 
          type="text" 
          value={data.title} 
          onChange={e => handleChange('title', e.target.value)}
          style={{ 
            width: '100%', height: '46px', padding: '0 16px', borderRadius: '14px', 
            border: `1px solid ${errors.title ? 'var(--primary)' : 'var(--surface-container)'}`, 
            background: 'var(--surface-container-lowest)', color: 'var(--on-surface)',
            fontSize: '14px', fontWeight: '600', outline: 'none'
          }}
          placeholder="e.g. Design app tokens or workout..." 
          autoFocus 
        />
        {errors.title && <span style={{ color: 'var(--primary)', fontSize: '11px', marginTop: '4px', display: 'block', fontWeight: '700' }}>{errors.title}</span>}
      </div>

      {/* Description */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Description / Notes</label>
        <textarea 
          value={data.description} 
          onChange={e => handleChange('description', e.target.value)}
          style={{ 
            width: '100%', padding: '12px 16px', borderRadius: '14px', 
            border: `1px solid ${errors.description ? 'var(--primary)' : 'var(--surface-container)'}`, 
            background: 'var(--surface-container-lowest)', color: 'var(--on-surface)', 
            minHeight: '76px', resize: 'vertical', fontSize: '13px', outline: 'none'
          }}
          placeholder="Add extra context, deliverables or notes..." 
        />
        {errors.description && <span style={{ color: 'var(--primary)', fontSize: '11px', fontWeight: '700' }}>{errors.description}</span>}
      </div>

      {/* Category & Priority */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Category</label>
          <select 
            value={data.category} 
            onChange={e => handleChange('category', e.target.value)}
            style={{ 
              width: '100%', height: '46px', padding: '0 14px', borderRadius: '14px', 
              border: '1px solid var(--surface-container)', background: 'var(--surface-container-lowest)', 
              color: 'var(--on-surface)', fontSize: '13px', fontWeight: '700', outline: 'none' 
            }}
          >
            {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Priority</label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['low', 'medium', 'high'].map(p => {
              const isActive = data.priority === p;
              const isHigh = p === 'high';
              const isMed = p === 'medium';
              return (
                <label 
                  key={p} 
                  style={{ 
                    flex: 1, height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: '14px', 
                    border: isActive ? (isHigh ? 'none' : (isMed ? '1px solid var(--warning)' : '1px solid var(--secondary)')) : '1px solid var(--surface-container)', 
                    background: isActive ? (isHigh ? 'var(--primary)' : (isMed ? 'var(--warning-surface)' : 'var(--surface-container)')) : 'var(--surface-container-lowest)', 
                    color: isActive ? (isHigh ? '#ffffff' : (isMed ? 'var(--warning)' : 'var(--on-surface)')) : 'var(--secondary)', 
                    cursor: 'pointer', fontWeight: '800', textTransform: 'capitalize', fontSize: '12px',
                    boxShadow: isActive && isHigh ? 'var(--shadow-fab)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input type="radio" name="priority" value={p} checked={isActive} onChange={e => handleChange('priority', e.target.value)} style={{ display: 'none' }} />
                  {isHigh ? '🔥 High' : p}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Due Date & Time */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Due Date</label>
          <input 
            type="date" 
            value={data.dueDate} 
            onChange={e => handleChange('dueDate', e.target.value)}
            style={{ 
              width: '100%', height: '46px', padding: '0 14px', borderRadius: '14px', 
              border: `1px solid ${errors.dueDate ? 'var(--primary)' : 'var(--surface-container)'}`, 
              background: 'var(--surface-container-lowest)', color: 'var(--on-surface)',
              fontSize: '13px', fontWeight: '600', outline: 'none' 
            }} 
          />
          {errors.dueDate && <span style={{ color: 'var(--primary)', fontSize: '11px', fontWeight: '700' }}>{errors.dueDate}</span>}
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '6px' }}>Due Time</label>
          <input 
            type="time" 
            value={data.dueTime} 
            onChange={e => handleChange('dueTime', e.target.value)}
            style={{ 
              width: '100%', height: '46px', padding: '0 14px', borderRadius: '14px', 
              border: '1px solid var(--surface-container)', background: 'var(--surface-container-lowest)', 
              color: 'var(--on-surface)', fontSize: '13px', fontWeight: '600', outline: 'none' 
            }} 
          />
        </div>
      </div>

      {/* Subtasks */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '8px' }}>Subtasks / Steps</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
          {data.subtasks.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-container)', padding: '8px 12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '700' }}>{i + 1}.</span>
              <span style={{ flex: 1, fontSize: '13px', textDecoration: s.completed ? 'line-through' : 'none', color: s.completed ? 'var(--secondary)' : 'var(--on-surface)', fontWeight: '600' }}>{s.title}</span>
              <button type="button" onClick={() => handleRemoveSubtask(s.id)} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            value={newSubtask} 
            onChange={e => setNewSubtask(e.target.value)} 
            placeholder="Add subtask step..." 
            onKeyDown={e => e.key === 'Enter' && handleAddSubtask(e)} 
            style={{ flex: 1, height: '42px', padding: '0 14px', borderRadius: '12px', border: '1px solid var(--surface-container)', background: 'var(--surface-container-lowest)', color: 'var(--on-surface)', fontSize: '13px', outline: 'none' }} 
          />
          <button 
            type="button" 
            onClick={handleAddSubtask} 
            style={{ height: '42px', padding: '0 18px', borderRadius: '12px', backgroundColor: 'var(--primary-surface)', color: 'var(--primary)', border: 'none', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Buttons */}
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
          {initialData?.id ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
