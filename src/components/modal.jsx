import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";

export default function Modal({ onClick, children, title = "" }) {
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") onClick(false);
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
            onClick={() => onClick(false)}
          />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={() => onClick(false)} />
    </>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
