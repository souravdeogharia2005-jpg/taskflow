import React from 'react';
import { getSubtaskProgress } from '../../utils/taskUtils.js';
const TaskProgress = ({ task }) => {
  const pct = getSubtaskProgress(task);
  return (
    <div className="task-progress flex items-center gap-2 mt-4">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} />
      </div>
      <span className="progress-label" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{pct}%</span>
    </div>
  );
};
export default TaskProgress;
