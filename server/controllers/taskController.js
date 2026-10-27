const { tasks, validateTask, createTask } = require('../models/taskModel.js');

// GET /api/tasks -- list with optional filters
const getAllTasks = (req, res) => {
  let result = [...tasks];
  const { status, priority, category, search } = req.query;
  if (status === 'completed') result = result.filter(t => t.completed);
  else if (status === 'pending') result = result.filter(t => !t.completed);
  if (priority) result = result.filter(t => t.priority === priority);
  if (category) result = result.filter(t => t.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }
  res.json({ success: true, data: result, total: result.length });
};

// GET /api/tasks/:id
const getTaskById = (req, res, next) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) { const err = new Error('Task not found'); err.status = 404; return next(err); }
  res.json({ success: true, data: task });
};

// POST /api/tasks
const createTaskHandler = (req, res, next) => {
  const errors = validateTask(req.body);
  if (errors.length) { const err = new Error(errors.join(', ')); err.status = 400; return next(err); }
  const task = createTask(req.body);
  tasks.push(task);
  res.status(201).json({ success: true, data: task });
};

// PUT /api/tasks/:id
const updateTaskHandler = (req, res, next) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) { const err = new Error('Task not found'); err.status = 404; return next(err); }
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id, updatedAt: new Date().toISOString() };
  res.json({ success: true, data: tasks[idx] });
};

// DELETE /api/tasks/:id
const deleteTaskHandler = (req, res, next) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) { const err = new Error('Task not found'); err.status = 404; return next(err); }
  tasks.splice(idx, 1);
  res.json({ success: true, message: 'Task deleted' });
};

// PATCH /api/tasks/:id/toggle
const toggleTaskHandler = (req, res, next) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) { const err = new Error('Task not found'); err.status = 404; return next(err); }
  task.completed = !task.completed;
  task.updatedAt = new Date().toISOString();
  res.json({ success: true, data: task });
};

module.exports = { getAllTasks, getTaskById, createTaskHandler, updateTaskHandler, deleteTaskHandler, toggleTaskHandler };
