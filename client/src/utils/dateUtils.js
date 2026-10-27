import { format, isToday, isTomorrow, isThisWeek, isPast, parseISO, startOfDay } from 'date-fns';

export { isToday, isTomorrow, isThisWeek };

export const isOverdue = (task) => {
  if (!task.dueDate || task.completed) return false;
  const due = parseISO(task.dueDate);
  return isPast(startOfDay(due)) && !isToday(due);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = parseISO(dateStr);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'MMM d, yyyy');
  } catch { return dateStr; }
};

export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  try {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
  } catch { return timeStr; }
};

export const groupTasksByDate = (tasks) => {
  const groups = {};
  tasks.forEach(task => {
    const key = task.dueDate || 'No Date';
    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
  });
  return groups;
};

export const groupTasksByCompletedDate = (tasks) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  tasks.forEach(task => {
    const updated = task.updatedAt ? task.updatedAt.slice(0, 10) : '';
    if (updated === today) groups.Today.push(task);
    else if (updated === yesterday) groups.Yesterday.push(task);
    else groups.Earlier.push(task);
  });
  return groups;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const getWeekDates = () => {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};
