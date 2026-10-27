import React, { useEffect, useRef } from 'react';
import TaskCard from './TaskCard.jsx';
import EmptyState from '../UI/EmptyState.jsx';
import { animateListEnter } from '../../animations/pageAnimations.js';

const TaskList = ({ tasks, onEditTask, emptyMessage = 'No tasks found' }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      animateListEnter(listRef.current.children);
    }
  }, [tasks]);

  if (!tasks?.length) {
    return <EmptyState title="No tasks found" description={emptyMessage} icon="task_alt" action={() => onEditTask && onEditTask()} actionLabel="Add Task" />;
  }

  return (
    <div ref={listRef} className="task-list">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEditTask} />
      ))}
    </div>
  );
};
export default TaskList;
