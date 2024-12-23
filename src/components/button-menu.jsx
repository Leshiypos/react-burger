//@ts-nocheck
import styles from "./button-menu.module.css";
import PropTypes from "prop-types";

export default function ButtonMenu({ children, isActive, ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={
        isActive ? `${styles.button} ${styles.active}` : `${styles.button}`
      }
    >
      {children}
    </button>
  );
}

ButtonMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  props: PropTypes.shape({
    onClick: PropTypes.func,
  }),
};
