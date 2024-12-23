import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function Card({ data, onClick }) {
  return (
    <>
      <li className={styles.card} onClick={() => onClick(data, true)}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={data.image} alt="" />
        <div className={styles.diamond}>
          <span>{data.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={data.title}>{data.name}</p>
      </li>
    </>
  );
}

Card.propTypes = {
  data: dataPropTypes.isRequired,
  onClick: PropTypes.func,
};
