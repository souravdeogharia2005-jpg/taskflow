import React from 'react';
import Modal from '../UI/Modal.jsx';
import TaskForm from './TaskForm.jsx';

const TaskModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData?.id ? 'Edit Task' : 'Create New Task'} size="md">
      <TaskForm initialData={initialData} onCancel={onClose} onSubmit={(data) => { onSubmit(data); onClose(); }} />
    </Modal>
  );
};
export default TaskModal;
