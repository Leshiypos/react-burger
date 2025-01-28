//@ts-nocheck
import { NavLink } from "react-router-dom";
import styles from "./button-menu.module.css";
import PropTypes from "prop-types";

export default function ButtonMenu({ children, ...props }) {
  return (
    <NavLink
      {...props}
      //   type="button"
      className={({ isActive }) =>
        isActive ? `${styles.button} ${styles.active}` : `${styles.button}`
      }
    >
      {children}
    </NavLink>
  );
}

ButtonMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  props: PropTypes.shape({
    onClick: PropTypes.func,
  }),
};
