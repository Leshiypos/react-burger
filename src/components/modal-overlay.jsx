import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
  return <div className={styles.overlay} {...props}></div>;
}

ModalOverlay.propTypes = {
  props: PropTypes.shape({
    onClick: PropTypes.func,
  }),
};
