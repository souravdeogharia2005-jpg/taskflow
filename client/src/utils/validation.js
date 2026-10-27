export const validateTask = (data) => {
  const errors = {};
  if (!data.title || !data.title.trim()) {
    errors.title = 'Task title is required';
  } else if (data.title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters';
  } else if (data.title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters';
  }
  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be under 500 characters';
  }
  if (data.dueDate) {
    const d = new Date(data.dueDate);
    if (isNaN(d.getTime())) errors.dueDate = 'Invalid date';
  }
  return { valid: Object.keys(errors).length === 0, errors };
};
