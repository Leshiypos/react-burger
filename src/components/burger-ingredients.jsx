import { useState } from "react";
import Card from "./card";
import styles from "./burger-ingredients.module.css";
import Tabs from "./tabs";
import Modal from "./modal";
import IngredientDetails from "./ingredient-details";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function BurgerIngredients({ data }) {
  const [tab, setTab] = useState("buns");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const hendleModalOpen = (dataModal, isOpen) => {
    setDataModal(dataModal);
    setIsModalOpen(isOpen);
  };

  const bun = data.filter((ingr) => ingr.type == "bun");
  const main = data.filter((ingr) => ingr.type == "main");
  const sauce = data.filter((ingr) => ingr.type == "sauce");

  return (
    <div className={styles.burger_ingredients}>
      <Tabs active={tab} onChange={(current) => setTab(current)} />
      <div className={styles.work_area}>
        <div>
          <h2 className={styles.title}>Булки</h2>
          <ul className={styles.cards}>
            {bun.map((elem) => (
              <Card key={elem._id} data={elem} onClick={hendleModalOpen} />
            ))}
          </ul>
        </div>
        <div>
          <h2>Соусы</h2>
          <ul className={styles.cards}>
            {sauce.map((elem) => (
              <Card key={elem._id} data={elem} onClick={hendleModalOpen} />
            ))}
          </ul>
        </div>
        <div>
          <h2>Начинка</h2>
          <ul className={styles.cards}>
            {main.map((elem) => (
              <Card key={elem._id} data={elem} onClick={hendleModalOpen} />
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Детали ингридиента"
          isOpen={isModalOpen}
          onClick={(current) => setIsModalOpen(current)}
        >
          <IngredientDetails data={dataModal} />
        </Modal>
      )}
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
