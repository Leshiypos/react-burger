import styles from "./tabs.module.css";
import Tab from "./tab";
import React from "react";

interface TInputProps {
  active: string;
  onChange: (elem: string) => void;
}

const Tabs = React.forwardRef<HTMLUListElement, TInputProps>(
  ({ active, onChange }, ref) => {
    return (
      <ul className={styles.tabs} ref={ref}>
        <Tab isActive={active === "buns"} onClick={() => onChange("buns")}>
          Булки
        </Tab>
        <Tab isActive={active === "sauces"} onClick={() => onChange("sauces")}>
          Соусы
        </Tab>
        <Tab isActive={active === "mains"} onClick={() => onChange("mains")}>
          Начинки
        </Tab>
      </ul>
    );
  }
);
export default Tabs;
