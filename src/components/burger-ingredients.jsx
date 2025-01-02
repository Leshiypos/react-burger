import { useState, useMemo } from "react";
import IndredientsCategory from "./ingredients-category";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function BurgerIngredients({ ingredients }) {
  const [tab, setTab] = useState("buns");
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const buns = useMemo(
    () => ingredients.filter((ingr) => ingr.type == "bun"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((ingr) => ingr.type == "main"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ingr) => ingr.type == "sauce"),
    [ingredients]
  );

  return (
    <div className={styles.burger_ingredients}>
      <Tabs active={tab} onChange={(current) => setTab(current)} />
      <ul className={styles.work_area}>
        <li>
          <IndredientsCategory
            title="Булки"
            ingredients={buns}
            onSelect={setSelectedIngredient}
          />
        </li>
        <li>
          <IndredientsCategory
            title="Соусы"
            ingredients={sauces}
            onSelect={setSelectedIngredient}
          />
        </li>
        <li>
          <IndredientsCategory
            title="Начинка"
            ingredients={mains}
            onSelect={setSelectedIngredient}
          />
        </li>
      </ul>
      {selectedIngredient && (
        <Modal
          title="Детали ингридиента"
          onClick={(current) => setSelectedIngredient(current)}
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes).isRequired,
};
