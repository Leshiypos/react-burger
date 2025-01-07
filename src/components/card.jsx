import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";
import { useDispatch } from "react-redux";
import { SHOW_DETAILS } from "../services/details/actions";
import { useDrag } from "react-dnd";

export default function Card({ ingredient }) {
  const dispatch = useDispatch();
  const [, ingredientRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "ingredient",
    item: ingredient,
  });

  const handleShowModal = () => {
    dispatch({
      type: SHOW_DETAILS,
      details: ingredient,
    });
  };
  return (
    <>
      <li
        className={styles.card}
        onClick={handleShowModal}
        ref={ingredientRef}
        draggable
      >
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={ingredient.image} alt="" />
        <div className={styles.diamond}>
          <span>{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={ingredient.title}>{ingredient.name}</p>
      </li>
    </>
  );
}

Card.propTypes = {
  ingredient: dataPropTypes.isRequired,
};
