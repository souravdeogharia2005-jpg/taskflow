import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

const Toast = ({ toast }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!toast || !ref.current) return;
    gsap.fromTo(ref.current, { x: 120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
  }, [toast]);

  if (!toast) return null;
  const icons = { success: '✓', info: 'ℹ', warning: '⚠', error: '✕' };
  return createPortal(
    <div className={`toast toast--${toast.type || 'success'}`} ref={ref} role="alert">
      <span className="toast-icon">{icons[toast.type] || icons.success}</span>
      <span className="toast-message">{toast.message}</span>
      {toast.action && (
        <button className="toast-action" onClick={toast.action.fn}>{toast.action.label}</button>
      )}
    </div>,
    document.body
  );
};
export default Toast;
