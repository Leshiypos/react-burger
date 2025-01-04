import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";
import { useSelector } from "react-redux";
import { getDetails } from "../services/details/selectors";

export default function IngredientDetails() {
  const { details } = useSelector(getDetails);
  return (
    <>
      <div className={styles.content}>
        <img src={details.image_large} alt="" />

        <div className={styles.name}>{details.name}</div>
        <div className={styles.description}>
          <div>
            <p>Каллории, ккал</p>
            <p className={styles.digital}>{details.calories}</p>
          </div>
          <div>
            <p>Белки, г</p>
            <p className={styles.digital}>{details.proteins}</p>
          </div>
          <div>
            <p>Жиры, г</p>
            <p className={styles.digital}>{details.fat}</p>
          </div>
          <div>
            <p>Углеводы, г</p>
            <p className={styles.digital}>{details.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  );
}
