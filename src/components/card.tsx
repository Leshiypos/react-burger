import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IConstructorIngredient } from "../util/types";
import { useSelector } from "../hooks/hooks";

interface ICardProps {
  ingredient: IConstructorIngredient;
}
interface ICounter {
  [key: string]: number;
}
type DragObject = IConstructorIngredient;

export default function Card({ ingredient }: ICardProps): React.JSX.Element {
  const location = useLocation();
  const selectIngredients = useSelector((store) => store.selectIngredients);
  const [, ingredientRef] = useDrag<DragObject, unknown, unknown>({
    type: ingredient.type === "bun" ? "bun" : "ingredient",
    item: ingredient,
  });
  const counter: ICounter =
    ingredient.type === "bun"
      ? selectIngredients.counterBun
      : selectIngredients.counter;

  const ingredientId: string = ingredient._id;
  return (
    <>
      <li ref={ingredientRef} draggable>
        <Link
          to={`/ingredients/${ingredientId}`}
          state={{ background: location }}
          className={styles.card}
        >
          {!!counter[ingredient._id] && (
            <Counter
              count={counter[ingredient._id]}
              size="default"
              extraClass="m-1"
            />
          )}
          <img src={ingredient.image} alt={ingredient.name} />
          <div className={styles.diamond}>
            <span>{ingredient.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <p className={styles.title}>{ingredient.name}</p>
        </Link>
      </li>
    </>
  );
}
