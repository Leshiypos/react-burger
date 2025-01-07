import { useState } from "react";
import { useSelector } from "react-redux";
import IndredientsCategory from "./ingredients-category";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details";
import { getDetails } from "../services/details/selectors";
import { getIngredientsByBategories } from "../services/ingredients/selectors";

export default function BurgerIngredients() {
  const [tab, setTab] = useState("buns");
  const { details } = useSelector(getDetails);
  const { buns, mains, sauces } = useSelector(getIngredientsByBategories);

  return (
    <div className={styles.burger_ingredients}>
      <Tabs active={tab} onChange={(current) => setTab(current)} />
      <ul className={styles.work_area}>
        <li>
          <IndredientsCategory title="Булки" ingredients={buns} />
        </li>
        <li>
          <IndredientsCategory title="Соусы" ingredients={sauces} />
        </li>
        <li>
          <IndredientsCategory title="Начинка" ingredients={mains} />
        </li>
      </ul>
      {details && (
        <Modal title="Детали ингридиента">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}
