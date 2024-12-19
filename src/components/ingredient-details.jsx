import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ data }) {
  return (
    <>
      <div className={styles.content}>
        <img src={data[0].image_large} alt="" />

        <div className={styles.name}>{data[0].name}</div>
        <div className={styles.description}>
          <div>
            <p>Каллории, ккал</p>
            <p className={styles.digital}>{data[0].calories}</p>
          </div>
          <div>
            <p>Белки, г</p>
            <p className={styles.digital}>{data[0].proteins}</p>
          </div>
          <div>
            <p>Жиры, г</p>
            <p className={styles.digital}>{data[0].fat}</p>
          </div>
          <div>
            <p>Углеводы, г</p>
            <p className={styles.digital}>{data[0].carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  );
}
