import styles from "./tabs.module.css";
import PropTypes from "prop-types";
import Tab from "./tab";

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

Tabs.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
