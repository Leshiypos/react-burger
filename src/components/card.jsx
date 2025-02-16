import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

export default function Card({ ingredient }) {
  const location = useLocation();
  const selectIngredients = useSelector((store) => store.selectIngredients);
  const [, ingredientRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "ingredient",
    item: ingredient,
  });
  const counter =
    ingredient.type === "bun"
      ? selectIngredients.counterBun
      : selectIngredients.counter;

  const ingredientId = ingredient._id;

  return (
    <>
      <li ref={ingredientRef} draggable>
        <Link
          to={`/ingredients/${ingredientId}`}
          state={{ background: location }}
          className={styles.card}
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
        </Link>
      </li>
    </>
  );
}

Card.propTypes = {
  ingredient: dataPropTypes.isRequired,
};
