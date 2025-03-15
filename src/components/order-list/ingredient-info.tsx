import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../hooks/hooks";
import { getIngredientsByBategories } from "../../services/ingredients/selectors";
import IconIngredient from "./icon-ingredient";
import styles from "./ingredient-info.module.css";

interface IIngredientInfoProps {
  count: number | null;
  id: string;
}

export default function IngredientInfo({
  count,
  id,
}: IIngredientInfoProps): JSX.Element {
  const { ingredientsWithIdKey } = useSelector(getIngredientsByBategories);
  return (
    <li className={styles.ingredient}>
      <div className={styles.discription}>
        <IconIngredient
          src={ingredientsWithIdKey[id].image_mobile}
          isLast={false}
        />
        <p className={styles.ingredient_name}>
          {ingredientsWithIdKey[id].name}
        </p>
      </div>
      <div className={styles.price}>
        <span>
          {count} X {ingredientsWithIdKey[id].price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
}
