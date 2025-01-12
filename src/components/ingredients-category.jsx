import styles from "./ingredients-category.module.css";
import Card from "./card";
import PropTypes from "prop-types";
import { getIngredientsByBategories } from "../services/ingredients/selectors";
import { useSelector } from "react-redux";

export default function IndredientsCategory({
  title,
  type,
  onClose = (f) => f,
}) {
  const { ingredientsSortByCategory } = useSelector(getIngredientsByBategories);

  return (
    <>
      <h2>{title}</h2>
      <ul className={styles.cards}>
        {ingredientsSortByCategory[type].map((elem) => (
          <Card key={elem._id} ingredient={elem} onClose={onClose} />
        ))}
      </ul>
    </>
  );
}

IndredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
