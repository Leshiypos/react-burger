import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";

export default function Modal({ isOpen, onClick, children }) {
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") onClick(false);
      console.log("render");
    };
    isOpen
      ? document.addEventListener("keydown", closeModal)
      : document.removeEventListener("keydown", closeModal);
  }, [isOpen]);
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h3 className={styles.title}>Детали ингридиента</h3>
              <CloseIcon
                type="primary"
                className={styles.close}
                onClick={() => onClick(false)}
              />
            </div>
            {children}
          </div>
          <ModalOverlay onClick={() => onClick(false)} />
        </>
      )}
    </>,
    document.getElementById("modal")
  );
}
