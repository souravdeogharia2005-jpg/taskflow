import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { createTask, updateTask as updateTaskUtil, deleteTask as deleteTaskUtil, toggleTask as toggleTaskUtil, toggleSubtask as toggleSubtaskUtil } from '../utils/taskUtils.js';

const TaskContext = createContext(null);

const DEFAULT_CATEGORIES = [
  { id: 'work', name: 'Work', icon: '💼', color: 'var(--cat-work)' },
  { id: 'study', name: 'Study', icon: '📚', color: 'var(--cat-study)' },
  { id: 'personal', name: 'Personal', icon: '🏠', color: 'var(--cat-personal)' },
  { id: 'shopping', name: 'Shopping', icon: '🛒', color: 'var(--cat-shopping)' },
  { id: 'health', name: 'Health', icon: '💪', color: 'var(--cat-health)' },
  { id: 'other', name: 'Other', icon: '📌', color: 'var(--cat-other)' },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [categories, setCategories] = useLocalStorage('categories', DEFAULT_CATEGORIES);
  const [userName, setUserName] = useLocalStorage('user_name', 'Achiever');
  const [toastData, setToastData] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openTaskModal = useCallback((task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setEditingTask(null), 300);
  }, []);

  const showToast = useCallback((message, type = 'success', action = null) => {
    const id = Date.now();
    setToastData({ id, message, type, action });
    setTimeout(() => setToastData(null), 4000);
  }, []);

  const toast = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  const addTask = useCallback((data) => {
    const task = createTask(data);
    setTasks(prev => [task, ...prev]);
    showToast(`✨ Task "${task.title}" created successfully!`);
    return task;
  }, [setTasks, showToast]);

  const editTask = useCallback((id, updates) => {
    setTasks(prev => updateTaskUtil(prev, id, updates));
    showToast('✨ Task updated successfully!');
  }, [setTasks, showToast]);

  const removeTask = useCallback((id) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      const next = deleteTaskUtil(prev, id);
      showToast('🗑️ Task deleted', 'info', {
        label: 'Undo',
        fn: () => setTasks(p => [task, ...p]),
      });
      return next;
    });
  }, [setTasks, showToast]);

  const toggleTask = useCallback((id) => {
    setTasks(prev => {
      const target = prev.find(t => t.id === id);
      const isFinishing = target && !target.completed;
      if (isFinishing) {
        showToast('🎉 Task completed! Keep up the momentum!', 'success');
      } else {
        showToast('🔄 Task marked as active', 'info');
      }
      return toggleTaskUtil(prev, id);
    });
  }, [setTasks, showToast]);

  const toggleSubtaskItem = useCallback((taskId, subtaskId) => {
    setTasks(prev => toggleSubtaskUtil(prev, taskId, subtaskId));
  }, [setTasks]);

  const addCategory = useCallback((cat) => {
    setCategories(prev => [...prev, cat]);
    showToast(`Category "${cat.name}" added!`);
  }, [setCategories, showToast]);

  const removeCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted');
  }, [setCategories, showToast]);

  return (
    <TaskContext.Provider value={{
      tasks, categories, userName, setUserName,
      addTask, editTask, removeTask, toggleTask, toggleSubtaskItem,
      addCategory, removeCategory,
      toast, showToast, toastData,
      isModalOpen, editingTask, openTaskModal, closeTaskModal
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
