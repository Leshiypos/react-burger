import styles from "./tabs.module.css";

function Tab({ children, isActive, ...props }) {
  return (
    <li
      {...props}
      className={isActive ? styles.tab : `${styles.tab} ${styles.inActive}`}
    >
      {children}
    </li>
  );
}

export default function Tabs({ active, onChange }) {
  return (
    <ul className={styles.tabs}>
      <Tab isActive={active === "buns"} onClick={() => onChange("buns")}>
        Булки
      </Tab>
      <Tab isActive={active === "sauces"} onClick={() => onChange("sauces")}>
        Соусы
      </Tab>
      <Tab isActive={active === "filling"} onClick={() => onChange("filling")}>
        Начинки
      </Tab>
    </ul>
  );
}
