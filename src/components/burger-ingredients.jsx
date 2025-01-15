import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndredientsCategory from "./ingredients-category";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details";
import { getDetails } from "../services/details/selectors";
import { HIDE_DETAILS } from "../services/details/actions";

export default function BurgerIngredients() {
  const [tab, setTab] = useState("buns");
  const tabRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const { details } = useSelector(getDetails);
  const dispatch = useDispatch();

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

  const handleCloseModal = () => {
    dispatch({
      type: HIDE_DETAILS,
    });
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
      {details && (
        <Modal title="Детали ингридиента" onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}
