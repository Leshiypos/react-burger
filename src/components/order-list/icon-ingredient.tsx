import React from "react";
import styles from "./icon-ingredient.module.css";

interface IIconIngredientProps {
  isLast: boolean;
  src: string;
  title?: string;
  count?: number;
}

export default function IconIngredient({
  isLast,
  src,
  title = "",
  count = 1,
}: IIconIngredientProps): React.JSX.Element {
  return (
    <div className={styles.ingredient_icon}>
      <div>
        <img src={src} alt={title} />
      </div>
      {isLast ? <span className={styles.count}>+{count}</span> : null}
    </div>
  );
}
