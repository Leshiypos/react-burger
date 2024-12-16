import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import data from "../util/data";

export default function Card({ id }) {
  const ingr = data.filter((ingr) => ingr._id == id);
  return (
    <li className={styles.card} style={{ position: "relative" }}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={ingr[0].image} alt="" />
      <div className={styles.diamond}>
        <span>{ingr[0].price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.title}>{ingr[0].name}</p>
    </li>
  );
}
