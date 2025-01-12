import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";
import { HIDE_DETAILS } from "../services/details/actions";
import { HIDE_ORDER } from "../services/order/actions";

export default function Modal({ children, title = "" }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") {
        handlHideModal();
      }
      document.removeEventListener("keydown", closeModal);
    };
    document.addEventListener("keydown", closeModal);

    return () => document.removeEventListener("keydown", closeModal);
  }, []);

  function handlHideModal() {
    dispatch({
      type: HIDE_DETAILS,
    });
    dispatch({
      type: HIDE_ORDER,
    });
  }

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <CloseIcon
            type="primary"
            className={styles.close}
            onClick={handlHideModal}
          />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={handlHideModal} />
    </>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  title: PropTypes.string,
};
