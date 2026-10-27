import React, { useState } from 'react';
import ConfirmDialog from '../components/UI/ConfirmDialog.jsx';
import { useTheme } from '../hooks/useTheme.js';
import { useTaskContext } from '../context/TaskContext.jsx';
import { clearAllStorage } from '../utils/storage.js';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { userName, setUserName, toast } = useTaskContext();
  const [nameInput, setNameInput] = useState(userName || '');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setUserName(nameInput.trim());
    toast(`👋 Profile updated! Hey, ${nameInput.trim()}!`);
  };

  const handleExport = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith('taskflow_')) data[k] = JSON.parse(localStorage.getItem(k));
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflow_export.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('📁 All your task data exported as JSON!');
  };

  const handleClearData = () => {
    clearAllStorage();
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        <div>
          <h1 style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '-0.02em', color: 'var(--on-surface)', fontWeight: '800' }}>Settings & Profile</h1>
          <p style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '700', marginTop: '2px' }}>Personalize your TaskFlow experience</p>
        </div>
      </div>

      {/* Profile Name Card */}
      <div style={{ backgroundColor: 'var(--surface-container-lowest)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-card-md)', border: '1px solid var(--surface-container)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--surface-container)', paddingBottom: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: 'var(--primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>badge</span>
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--on-surface)' }}>Profile Identity</h3>
            <p style={{ fontSize: '13px', color: 'var(--secondary)' }}>How should TaskFlow greet you?</p>
          </div>
        </div>

        <form onSubmit={handleSaveName} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <input 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)} 
              placeholder="Enter your name (e.g. Sourav, Alex)..." 
              style={{
                width: '100%', height: '46px', padding: '0 16px', borderRadius: '14px',
                border: '1px solid var(--surface-container)', backgroundColor: 'var(--surface-container-lowest)',
                color: 'var(--on-surface)', fontSize: '14px', fontWeight: '600', outline: 'none'
              }}
            />
          </div>
          <button 
            type="submit"
            className="btn-primary"
            style={{
              height: '46px', padding: '0 24px', borderRadius: '9999px',
              backgroundColor: 'var(--primary)', color: '#ffffff',
              boxShadow: 'var(--shadow-fab)', border: 'none', cursor: 'pointer',
              fontWeight: '800', fontSize: '13px'
            }}
          >
            Save Name
          </button>
        </form>
      </div>

      {/* Theme Card */}
      <div style={{ backgroundColor: 'var(--surface-container-lowest)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-card-md)', border: '1px solid var(--surface-container)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--surface-container)', paddingBottom: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: 'var(--primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>palette</span>
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--on-surface)' }}>Appearance & Theme</h3>
            <p style={{ fontSize: '13px', color: 'var(--secondary)' }}>Choose your visual aesthetic</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <button 
            onClick={() => setTheme('light')}
            style={{ 
              padding: '18px 14px', borderRadius: '18px', 
              border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--surface-container)',
              backgroundColor: theme === 'light' ? 'var(--primary-surface)' : 'var(--surface-container-lowest)',
              color: theme === 'light' ? 'var(--primary)' : 'var(--on-surface-variant)',
              boxShadow: theme === 'light' ? '0 4px 16px var(--primary-glow)' : 'var(--shadow-card-sm)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>light_mode</span>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>Modern Sky</span>
            <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '600' }}>Sky Blue & White</span>
          </button>
          
          <button 
            onClick={() => setTheme('retro')}
            style={{ 
              padding: '18px 14px', borderRadius: '18px', 
              border: theme === 'retro' ? '2px solid var(--primary)' : '1px solid var(--surface-container)',
              backgroundColor: theme === 'retro' ? 'var(--primary-surface)' : 'var(--surface-container-lowest)',
              color: theme === 'retro' ? 'var(--primary)' : 'var(--on-surface-variant)',
              boxShadow: theme === 'retro' ? '0 4px 16px var(--primary-glow)' : 'var(--shadow-card-sm)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>desktop_windows</span>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>Retro Classic</span>
            <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '600' }}>Google & FB 2000s</span>
          </button>

          <button 
            onClick={() => setTheme('dark')}
            style={{ 
              padding: '18px 14px', borderRadius: '18px', 
              border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--surface-container)',
              backgroundColor: theme === 'dark' ? 'var(--primary-surface)' : 'var(--surface-container-lowest)',
              color: theme === 'dark' ? 'var(--primary)' : 'var(--on-surface-variant)',
              boxShadow: theme === 'dark' ? '0 4px 16px var(--primary-glow)' : 'var(--shadow-card-sm)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>dark_mode</span>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>Night Mode</span>
            <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '600' }}>Obsidian & Slate</span>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div style={{ backgroundColor: 'var(--surface-container-lowest)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow-card-md)', border: '1px solid var(--surface-container)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--surface-container)', paddingBottom: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: 'var(--warning-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>database</span>
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--on-surface)' }}>Data Management</h3>
            <p style={{ fontSize: '13px', color: 'var(--secondary)' }}>Backup, restore or reset your workspace</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)' }}>Export Data</div>
            <div style={{ fontSize: '13px', color: 'var(--secondary)' }}>Download all tasks, subtasks and categories as a JSON file</div>
          </div>
          <button 
            onClick={handleExport} 
            style={{ 
              height: '40px', padding: '0 20px', borderRadius: '9999px', 
              backgroundColor: 'var(--surface-container)', color: 'var(--on-surface)', 
              border: 'none', fontWeight: '800', fontSize: '13px', cursor: 'pointer' 
            }}
          >
            Export JSON
          </button>
        </div>
        
        <div style={{ height: '1px', backgroundColor: 'var(--surface-container)' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>Clear All Data & Reset</div>
            <div style={{ fontSize: '13px', color: 'var(--secondary)' }}>Permanently erase all tasks and reset to fresh initial state</div>
          </div>
          <button 
            onClick={() => setConfirmOpen(true)} 
            style={{ 
              height: '40px', padding: '0 20px', borderRadius: '9999px', 
              backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)', 
              border: 'none', fontWeight: '800', fontSize: '13px', cursor: 'pointer' 
            }}
          >
            Clear All Data
          </button>
        </div>
      </div>

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleClearData}
        title="Reset & Clear All Data"
        message="Are you sure you want to delete all tasks, categories, and settings? This will restore the app to a clean, fresh slate."
        confirmLabel="Yes, Clear Everything" danger />
    </div>
  );
};

export default Settings;
