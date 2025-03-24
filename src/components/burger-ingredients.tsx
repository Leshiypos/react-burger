import React, { useRef, useState } from "react";
import IndredientsCategory from "./ingredients-category";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";

export default function BurgerIngredients(): React.JSX.Element {
  const [tab, setTab] = useState<string>("buns");
  const tabRef = useRef<HTMLUListElement | null>(null);
  const bunsRef = useRef<HTMLLIElement | null>(null);
  const saucesRef = useRef<HTMLLIElement | null>(null);
  const handleScrollСhangeTab = (): void => {
    if (!bunsRef.current) {
      return;
    }
    if (!tabRef.current) {
      return;
    }
    if (!saucesRef.current) {
      return;
    }
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
        <li ref={bunsRef} data-testid="drag_wrap_buns">
          <IndredientsCategory title="Булки" type="buns" />
        </li>
        <li ref={saucesRef} data-testid="drag_wrap_sauces">
          <IndredientsCategory title="Соусы" type="sauces" />
        </li>
        <li>
          <IndredientsCategory title="Начинка" type="mains" />
        </li>
      </ul>
    </div>
  );
}
