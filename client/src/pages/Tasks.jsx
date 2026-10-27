import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '../components/Layout/PageContainer.jsx';
import TaskList from '../components/Tasks/TaskList.jsx';
import TaskFilters from '../components/Tasks/TaskFilters.jsx';
import SearchBar from '../components/UI/SearchBar.jsx';
import Dropdown from '../components/UI/Dropdown.jsx';
import Button from '../components/UI/Button.jsx';
import { useTaskContext } from '../context/TaskContext.jsx';
import { filterTasks, sortTasks } from '../utils/taskUtils.js';
import { useDebounce } from '../hooks/useDebounce.js';

const Tasks = () => {
  const { tasks, openTaskModal } = useTaskContext();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  const categoryParam = searchParams.get('category');
  const statusParam = searchParams.get('status');
  const dueParam = searchParams.get('due');
  const priorityParam = searchParams.get('priority');

  const [filters, setFilters] = useState({
    status: statusParam || 'all',
    category: categoryParam || 'all',
    priority: priorityParam || 'all',
    due: dueParam || 'all'
  });
  const [sortBy, setSortBy] = useState('dueDate');

  useEffect(() => {
    if (categoryParam || statusParam || dueParam || priorityParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam || prev.category,
        status: statusParam || prev.status,
        due: dueParam || prev.due,
        priority: priorityParam || prev.priority,
      }));
    }
  }, [categoryParam, statusParam, dueParam, priorityParam]);

  const filteredTasks = useMemo(() => {
    let result = filterTasks(tasks, { ...filters, search: debouncedSearch });
    return sortTasks(result, sortBy);
  }, [tasks, filters, debouncedSearch, sortBy]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div>
          <h1 style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '-0.02em', color: 'var(--on-surface)', fontWeight: '800' }}>My Tasks</h1>
          <p style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '700', marginTop: '2px' }}>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} on your list
          </p>
        </div>
        <button 
          onClick={() => openTaskModal()}
          style={{ 
            height: '42px', padding: '0 20px', borderRadius: '9999px', 
            backgroundColor: 'var(--primary)', color: '#ffffff', 
            boxShadow: 'var(--shadow-fab)', display: 'flex', alignItems: 'center', gap: '8px', 
            border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '13px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          Add Task
        </button>
      </div>

      {/* Search and Sort */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--secondary)', fontSize: '20px' }}>search</span>
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search tasks by title, category, priority..." 
            style={{ 
              width: '100%', height: '44px', paddingLeft: '48px', paddingRight: '16px', 
              borderRadius: '9999px', backgroundColor: 'var(--surface-container-lowest)', 
              border: '1px solid var(--surface-container)', outline: 'none', fontSize: '13px', 
              color: 'var(--on-surface)', boxShadow: 'var(--shadow-card-sm)'
            }} 
          />
        </div>
        <div style={{ width: '180px' }}>
          <Dropdown value={sortBy} onChange={setSortBy} options={[
            { value: 'dueDate', label: 'Sort by Due Date' },
            { value: 'priority', label: 'Sort by Priority' },
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'alphabetical', label: 'A-Z' }
          ]} />
        </div>
      </div>

      <TaskFilters filters={filters} setFilters={setFilters} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <TaskList tasks={filteredTasks} onEditTask={openTaskModal} emptyMessage={tasks.length === 0 ? "No tasks added yet. Tap Add Task to begin!" : "No tasks matching your active filters."} />
      </div>

    </div>
  );
};

export default Tasks;
