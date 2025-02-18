import styles from "./tab.module.css";
import PropTypes from "prop-types";

export default function Tab({ children, isActive, ...props }) {
  return (
    <li
      {...props}
      className={isActive ? styles.tab : `${styles.tab} ${styles.inActive}`}
    >
      {children}
    </li>
  );
}

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  props: PropTypes.shape({
    onClick: PropTypes.func,
  }),
};
