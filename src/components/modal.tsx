import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import React, { ReactNode, useEffect } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({
  onClose,
  children,
  title = "",
}: IModalProps): React.JSX.Element {
  useEffect(() => {
    const closeModal = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
      document.removeEventListener("keydown", closeModal);
    };
    document.addEventListener("keydown", closeModal);

    return () => document.removeEventListener("keydown", closeModal);
  }, []);
  const modalRoot = document.getElementById("modal") as HTMLElement;

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <CloseIcon
            type="primary"
            className={styles.close}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
}
