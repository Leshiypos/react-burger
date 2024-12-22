import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function IngredientDetails({ data }) {
  return (
    <>
      <div className={styles.content}>
        <img src={data.image_large} alt="" />

        <div className={styles.name}>{data.name}</div>
        <div className={styles.description}>
          <div>
            <p>Каллории, ккал</p>
            <p className={styles.digital}>{data.calories}</p>
          </div>
          <div>
            <p>Белки, г</p>
            <p className={styles.digital}>{data.proteins}</p>
          </div>
          <div>
            <p>Жиры, г</p>
            <p className={styles.digital}>{data.fat}</p>
          </div>
          <div>
            <p>Углеводы, г</p>
            <p className={styles.digital}>{data.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  data: dataPropTypes.isRequired,
};
