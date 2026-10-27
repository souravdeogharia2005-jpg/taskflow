import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animateModalOpen, animateModalClose } from '../../animations/modalAnimations.js';
import Button from './Button.jsx';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false }) => {
  const backdropRef = useRef(null);
  const boxRef = useRef(null);
  useEffect(() => {
    if (isOpen) setTimeout(() => animateModalOpen(backdropRef.current, boxRef.current), 10);
  }, [isOpen]);
  const handleClose = () => animateModalClose(backdropRef.current, boxRef.current, onClose);
  const handleConfirm = () => animateModalClose(backdropRef.current, boxRef.current, onConfirm);
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-backdrop" ref={backdropRef}>
      <div className="modal-box modal-box--sm" ref={boxRef} role="alertdialog" aria-modal="true">
        <div className="confirm-dialog">
          <div className={`confirm-icon ${danger ? 'confirm-icon--danger' : ''}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
          <div className="confirm-actions">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant={danger ? 'danger' : 'primary'} onClick={handleConfirm}>{confirmLabel}</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default ConfirmDialog;
