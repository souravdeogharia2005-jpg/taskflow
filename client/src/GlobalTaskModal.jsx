import React from 'react';
import TaskModal from './components/Tasks/TaskModal.jsx';
import { useTaskContext } from './context/TaskContext.jsx';

const GlobalTaskModal = () => {
  const { isModalOpen, closeTaskModal, editingTask, addTask, editTask } = useTaskContext();

  const handleSubmit = (data) => {
    if (editingTask && editingTask.id) {
      editTask(editingTask.id, data);
    } else {
      addTask({ ...editingTask, ...data });
    }
    closeTaskModal();
  };

  return (
    <TaskModal 
      isOpen={isModalOpen} 
      onClose={closeTaskModal} 
      initialData={editingTask} 
      onSubmit={handleSubmit} 
    />
  );
};

export default GlobalTaskModal;
