import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import IndredientsCategory from "./ingredients-category";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details";
import { getDetails } from "../services/details/selectors";

export default function BurgerIngredients() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("buns");
  const tabRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();

  const { details } = useSelector(getDetails);

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
          <IndredientsCategory title="Булки" type="buns" onClose={setIsOpen} />
        </li>
        <li ref={saucesRef}>
          <IndredientsCategory
            title="Соусы"
            type="sauces"
            onClose={setIsOpen}
          />
        </li>
        <li>
          <IndredientsCategory
            title="Начинка"
            type="mains"
            onClose={setIsOpen}
          />
        </li>
      </ul>
      {isOpen && (
        <Modal title="Детали ингридиента" onClose={setIsOpen}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}
