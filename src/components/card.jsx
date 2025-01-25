import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../services/details/actions";
import { useDrag } from "react-dnd";

export default function Card({ ingredient }) {
  const dispatch = useDispatch();
  const selectIngredients = useSelector((store) => store.selectIngredients);
  const [, ingredientRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "ingredient",
    item: ingredient,
  });
  const counter =
    ingredient.type === "bun"
      ? selectIngredients.counterBun
      : selectIngredients.counter;
  const handleShowModal = () => {
    dispatch(showDetails(ingredient));
  };

  return (
    <>
      <li
        className={styles.card}
        onClick={handleShowModal}
        ref={ingredientRef}
        draggable
      >
        {!!counter[ingredient._id] && (
          <Counter
            count={counter[ingredient._id]}
            size="default"
            extraClass="m-1"
          />
        )}
        <img src={ingredient.image} alt={ingredient.name} />
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
