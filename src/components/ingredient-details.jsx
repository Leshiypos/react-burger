import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../services/details/selectors";
import { useEffect } from "react";
import { HIDE_DETAILS } from "../services/details/actions";

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const { details } = useSelector(getDetails);
  useEffect(() => {
    return () => {
      dispatch({
        type: HIDE_DETAILS,
      });
    };
  }, []);
  return (
    <>
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
    </>
  );
}
