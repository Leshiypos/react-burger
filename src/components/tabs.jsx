import styles from "./tabs.module.css";
import PropTypes from "prop-types";
import Tab from "./tab";
import React from "react";

const Tabs = React.forwardRef(({ active, onChange }, ref) => {
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
});
export default Tabs;

Tabs.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
