import { generateId } from './id.js';
import { isToday, isThisWeek, isTomorrow, isOverdue } from './dateUtils.js';
import { parseISO } from 'date-fns';

export const createTask = (data) => ({
  id: generateId(),
  title: data.title.trim(),
  description: data.description?.trim() || '',
  completed: false,
  category: data.category || 'Other',
  priority: data.priority || 'medium',
  dueDate: data.dueDate || '',
  dueTime: data.dueTime || '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  subtasks: data.subtasks || [],
});

export const updateTask = (tasks, id, updates) =>
  tasks.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t);

export const deleteTask = (tasks, id) => tasks.filter(t => t.id !== id);

export const toggleTask = (tasks, id) =>
  tasks.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t);

export const toggleSubtask = (tasks, taskId, subtaskId) =>
  tasks.map(t => {
    if (t.id !== taskId) return t;
    return {
      ...t,
      subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s),
      updatedAt: new Date().toISOString(),
    };
  });

export const getSubtaskProgress = (task) => {
  if (!task.subtasks || task.subtasks.length === 0) return task.completed ? 100 : 0;
  const done = task.subtasks.filter(s => s.completed).length;
  return Math.round((done / task.subtasks.length) * 100);
};

const priorityRank = { low: 1, medium: 2, high: 3 };

export const sortTasks = (tasks, sortBy) => {
  const arr = [...tasks];
  switch (sortBy) {
    case 'newest': return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest': return arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'dueDate': return arr.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    case 'priority': return arr.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
    case 'alphabetical': return arr.sort((a, b) => a.title.localeCompare(b.title));
    case 'updated': return arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    default: return arr;
  }
};

export const filterTasks = (tasks, { status, priority, category, due, search }) => {
  let result = [...tasks];
  if (status === 'pending') result = result.filter(t => !t.completed);
  else if (status === 'completed') result = result.filter(t => t.completed);
  if (priority && priority !== 'all') result = result.filter(t => t.priority === priority);
  if (category && category !== 'all') result = result.filter(t => t.category === category);
  if (due && due !== 'all') {
    result = result.filter(t => {
      if (!t.dueDate) return false;
      try {
        const d = parseISO(t.dueDate);
        if (due === 'today') return isToday(d);
        if (due === 'tomorrow') return isTomorrow(d);
        if (due === 'week') return isThisWeek(d, { weekStartsOn: 1 });
        if (due === 'overdue') return isOverdue(t);
      } catch { return false; }
      return true;
    });
  }
  if (search && search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.priority.toLowerCase().includes(q)
    );
  }
  return result;
};

export const getStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(t => isOverdue(t)).length;
  const todayTasks = tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)));
  const todayCompleted = todayTasks.filter(t => t.completed).length;
  return { total, completed, pending, overdue, todayTasks, todayCompleted };
};

export const getWeeklyData = (tasks) => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days.map((day, i) => {
    const d = new Date();
    const dow = d.getDay();
    const diff = i - (dow === 0 ? 6 : dow - 1);
    d.setDate(d.getDate() + diff);
    const dateStr = d.toISOString().slice(0, 10);
    const completed = tasks.filter(t => t.completed && t.updatedAt?.slice(0, 10) === dateStr).length;
    const created = tasks.filter(t => t.createdAt?.slice(0, 10) === dateStr).length;
    return { day, date: dateStr, completed, created };
  });
};

export const getCategoryStats = (tasks, categories) => {
  return categories.map(cat => {
    const catTasks = tasks.filter(t => t.category === cat.name);
    const completed = catTasks.filter(t => t.completed).length;
    return { ...cat, total: catTasks.length, completed };
  });
};
