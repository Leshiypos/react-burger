//@ts-nocheck
import styles from "./button-menu.module.css";
export default function ButtonMenu({ children, isAcive }) {
  return (
    <button
      type="button"
      className={
        isAcive
          ? `${styles.button} ${styles.active} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`
          : `${styles.button} pl-5 pr-5 pt-4 pb-4 text text_type_main-default`
      }
    >
      {children}
    </button>
  );
}
