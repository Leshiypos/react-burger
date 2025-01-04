import styles from "./ingredients-category.module.css";
import Card from "./card";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";

export default function IndredientsCategory({ title, ingredients }) {
  return (
    <>
      <h2>{title}</h2>
      <ul className={styles.cards}>
        {ingredients.map((elem) => (
          <Card key={elem._id} ingredient={elem} />
        ))}
      </ul>
    </>
  );
}

IndredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes).isRequired,
  title: PropTypes.string.isRequired,
};
