import { useRef, useState } from "react";
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
  const tabRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();

  const { details } = useSelector(getDetails);
  const { buns, mains, sauces } = useSelector(getIngredientsByBategories);

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
          <IndredientsCategory title="Булки" ingredients={buns} />
        </li>
        <li ref={saucesRef}>
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
