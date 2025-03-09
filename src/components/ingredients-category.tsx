import styles from "./ingredients-category.module.css";
import Card from "./card";
import { getIngredientsByBategories } from "../services/ingredients/selectors";

import React from "react";
import { IConstructorIngredient } from "../util/types";
import { useSelector } from "../hooks/hooks";

interface IIndredientsCategoryProps {
  title: string;
  type: string;
}

interface IIngredientsSortByCategory {
  ingredientsSortByCategory: {
    [key: string]: IConstructorIngredient[];
  };
}

export default function IndredientsCategory({
  title,
  type,
}: IIndredientsCategoryProps): React.JSX.Element {
  const { ingredientsSortByCategory }: IIngredientsSortByCategory = useSelector(
    getIngredientsByBategories
  );

  return (
    <>
      <h2>{title}</h2>
      <ul className={styles.cards}>
        {ingredientsSortByCategory[type].map(
          (elem: IConstructorIngredient): React.JSX.Element => (
            <Card key={elem._id} ingredient={elem} />
          )
        )}
      </ul>
    </>
  );
}
