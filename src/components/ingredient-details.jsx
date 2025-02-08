import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { getIngredientsState } from "../services/ingredients/selectors";
import { useParams } from "react-router-dom";

export default function IngredientDetails() {
  const { ingredientId } = useParams();
  const { ingredients } = useSelector(getIngredientsState);
  const details = ingredients.find((elem) => elem._id === ingredientId);

  return (
    <>
      {details && (
        <div className={styles.content}>
          <img src={details.image_large} alt={details.name} />

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
      )}
    </>
  );
}
