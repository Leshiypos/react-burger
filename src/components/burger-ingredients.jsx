import { useState } from "react";
import Card from "./card";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";

export default function BurgerIngredients() {
  const [tab, setTab] = useState("buns");
  return (
    <div className={styles.burger_ingredients}>
      <Tabs active={tab} onChange={(current) => setTab(current)} />
      <div className={styles.work_area}>
        <div>
          <h2 className={styles.title}>Булки</h2>
          <ul className={styles.cards}>
            <Card id={"60666c42cc7b410027a1a9b8"} />
            <Card id={"60666c42cc7b410027a1a9b1"} />
          </ul>
        </div>
        <div>
          <h2>Соусы</h2>
          <ul className={styles.cards}>
            <Card id={"60666c42cc7b410027a1a9b4"} />
            <Card id={"60666c42cc7b410027a1a9b6"} />
          </ul>
        </div>
        <div>
          <h2>Начинка</h2>
          <ul className={styles.cards}>
            <Card id={"60666c42cc7b410027a1a9b6"} />
            <Card id={"60666c42cc7b410027a1a9b5"} />
          </ul>
        </div>
      </div>
    </div>
  );
}
