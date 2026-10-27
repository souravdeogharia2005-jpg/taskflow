const { v4: uuidv4 } = require('uuid');

// In-memory store (replace with DB in production)
let tasks = [];

const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_CATEGORIES = ['Work', 'Study', 'Personal', 'Shopping', 'Health', 'Other'];

const validateTask = (data) => {
  const errors = [];
  if (!data.title || !String(data.title).trim()) errors.push('title is required');
  if (data.priority && !VALID_PRIORITIES.includes(data.priority)) errors.push('invalid priority');
  if (data.dueDate && isNaN(new Date(data.dueDate).getTime())) errors.push('invalid dueDate');
  return errors;
};

const createTask = (data) => ({
  id: uuidv4(),
  title: String(data.title).trim(),
  description: data.description ? String(data.description).trim() : '',
  completed: false,
  category: data.category || 'Other',
  priority: VALID_PRIORITIES.includes(data.priority) ? data.priority : 'medium',
  dueDate: data.dueDate || '',
  dueTime: data.dueTime || '',
  subtasks: Array.isArray(data.subtasks) ? data.subtasks : [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

module.exports = { tasks, validateTask, createTask, VALID_PRIORITIES, VALID_CATEGORIES };
