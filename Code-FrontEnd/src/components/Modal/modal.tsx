import React, { ReactNode, useEffect, useState } from 'react';
import './modal.scss';
import { Badge } from 'components/Badge/badge';

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  badge?: React.ReactNode;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  badge,
}) => {
  const [showElement, setShowElement] = useState(open);

  useEffect(() => {
    if (open) {
      // Por que???
      // O browser precisa ter computado a classe de modal-container-close
      // com o opacity 0 antes de trocar para opacity 1 (modal-container-open)
      requestAnimationFrame(() => {
        setTimeout(() => setShowElement(true));
      });
    } else {
      setTimeout(() => {
        setShowElement(false);
      }, 200);
    }
  }, [open]);

  if (open || showElement) {
    return (
      <div
        className={`modal-container ${
          open && showElement ? 'modal-container-open' : 'modal-container-close'
        }`}
      >
        <div className="modal">
          <div className="header">
            <h1>{title}</h1>
            <div className="badge">{badge}</div>
            <span className="close-icon" onClick={onClose}>
              X
            </span>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
  return null;
};
