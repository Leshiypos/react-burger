//@ts-nocheck
import styles from "./button-menu.module.css";
export default function ButtonMenu({ children, isAcive }) {
  return (
    <button
      type="button"
      className={
        isAcive ? `${styles.button} ${styles.active}` : `${styles.button}`
      }
    >
      {children}
    </button>
  );
}
