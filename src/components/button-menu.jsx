//@ts-nocheck
import styles from "./button-menu.module.css";
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
