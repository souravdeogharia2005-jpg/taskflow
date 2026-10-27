import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animateModalOpen, animateModalClose } from '../../animations/modalAnimations.js';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const backdropRef = useRef(null);
  const boxRef = useRef(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      closingRef.current = false;
      setTimeout(() => animateModalOpen(backdropRef.current, boxRef.current), 10);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    animateModalClose(backdropRef.current, boxRef.current, onClose);
  };

  if (!isOpen) return null;
  return createPortal(
    <div className="modal-backdrop" ref={backdropRef} onClick={e => { if (e.target === backdropRef.current) handleClose(); }}>
      <div className={`modal-box modal-box--${size}`} ref={boxRef} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close btn btn--icon" onClick={handleClose} aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};
export default Modal;
