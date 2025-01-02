import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function IngredientDetails({ ingredient }) {
  return (
    <>
      <div className={styles.content}>
        <img src={ingredient.image_large} alt="" />

        <div className={styles.name}>{ingredient.name}</div>
        <div className={styles.description}>
          <div>
            <p>Каллории, ккал</p>
            <p className={styles.digital}>{ingredient.calories}</p>
          </div>
          <div>
            <p>Белки, г</p>
            <p className={styles.digital}>{ingredient.proteins}</p>
          </div>
          <div>
            <p>Жиры, г</p>
            <p className={styles.digital}>{ingredient.fat}</p>
          </div>
          <div>
            <p>Углеводы, г</p>
            <p className={styles.digital}>{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: dataPropTypes.isRequired,
};
