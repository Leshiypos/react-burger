import { useRef, useState } from "react";
import IndredientsCategory from "./ingredients-category";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";

export default function BurgerIngredients() {
  const [tab, setTab] = useState("buns");
  const tabRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const handleScrollСhangeTab = () => {
    const bunsDef =
      bunsRef.current.getBoundingClientRect().bottom -
      tabRef.current.getBoundingClientRect().bottom;
    const saucesDef =
      saucesRef.current.getBoundingClientRect().bottom -
      tabRef.current.getBoundingClientRect().bottom;

    bunsDef > 0
      ? setTab("buns")
      : saucesDef > 0
      ? setTab("sauces")
      : setTab("mains");
  };

  return (
    <div className={styles.burger_ingredients}>
      <Tabs active={tab} onChange={(current) => setTab(current)} ref={tabRef} />
      <ul className={styles.work_area} onScroll={handleScrollСhangeTab}>
        <li ref={bunsRef}>
          <IndredientsCategory title="Булки" type="buns" />
        </li>
        <li ref={saucesRef}>
          <IndredientsCategory title="Соусы" type="sauces" />
        </li>
        <li>
          <IndredientsCategory title="Начинка" type="mains" />
        </li>
      </ul>
    </div>
  );
}
