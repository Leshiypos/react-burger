import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";

export default function Modal({ onClose = (f) => f, children, title = "" }) {
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") {
        onClose(false);
      }
      document.removeEventListener("keydown", closeModal);
    };
    document.addEventListener("keydown", closeModal);

    return () => document.removeEventListener("keydown", closeModal);
  }, []);

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <CloseIcon
            type="primary"
            className={styles.close}
            onClick={() => onClose(false)}
          />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={() => onClose(false)} />
    </>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};
