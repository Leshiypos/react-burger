import styles from "./modal.module.css";
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";

export default function Modal({ isOpen, onClick, children }) {
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
