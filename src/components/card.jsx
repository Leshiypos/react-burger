import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function Card({ ingredient, onSelect }) {
  return (
    <>
      <li className={styles.card} onClick={() => onSelect(ingredient)}>
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
  onSelect: PropTypes.func,
};
