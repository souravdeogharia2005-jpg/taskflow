import React, { useState } from 'react';
import PageContainer from '../components/Layout/PageContainer.jsx';
import CategoryCard from '../components/Categories/CategoryCard.jsx';
import Modal from '../components/UI/Modal.jsx';
import CategoryForm from '../components/Categories/CategoryForm.jsx';
import ConfirmDialog from '../components/UI/ConfirmDialog.jsx';
import Button from '../components/UI/Button.jsx';
import { useTasks } from '../hooks/useTasks.js';
import { getCategoryStats } from '../utils/taskUtils.js';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const { categories, addCategory, removeCategory, tasks, showToast } = useTasks();
  const navigate = useNavigate();
  const catStats = getCategoryStats(tasks, categories);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);

  const handleAdd = (cat) => {
    addCategory(cat);
    setModalOpen(false);
    showToast('Category created');
  };

  const handleDelete = () => {
    if (!catToDelete) return;
    const catTasks = tasks.filter(t => t.category === catToDelete.name);
    if (catTasks.length > 0) {
      showToast(`Cannot delete category with ${catTasks.length} tasks`, 'error');
      setConfirmOpen(false);
      return;
    }
    removeCategory(catToDelete.id);
    showToast('Category deleted');
    setConfirmOpen(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div>
          <h1 style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '-0.02em', color: 'var(--on-surface)', fontWeight: '800' }}>Categories & Projects</h1>
          <p style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '700', marginTop: '2px' }}>Organize your tasks into structured categories</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setModalOpen(true)}
          style={{ 
            height: '42px', padding: '0 20px', borderRadius: '9999px', 
            backgroundColor: 'var(--primary)', color: '#ffffff', 
            boxShadow: 'var(--shadow-fab)', display: 'flex', alignItems: 'center', gap: '8px', 
            border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '13px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          New Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {catStats.map(cat => (
          <CategoryCard key={cat.id} category={cat} 
            onClick={(c) => navigate(`/tasks?category=${c.name}`)}
            onDelete={(c) => { setCatToDelete(c); setConfirmOpen(true); }}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Category">
        <CategoryForm onSubmit={handleAdd} onCancel={() => setModalOpen(false)} />
      </Modal>

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete}
        title="Delete Category"
        message={catToDelete ? `Are you sure you want to delete the "${catToDelete.name}" category?` : ''}
        confirmLabel="Delete" danger />
    </div>
  );
};
export default Categories;
