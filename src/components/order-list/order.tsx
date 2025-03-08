import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { IOrder } from "../../services/feed-orders/actions";
import { dateFormated } from "../../util/functions";
import { useSelector } from "../../hooks/hooks";
import { getIngredientsByBategories } from "../../services/ingredients/selectors";
import IconIngredient from "./icon-ingredient";
import { Link, useLocation } from "react-router-dom";

interface IOrderProps {
  order: IOrder;
  hasStatus?: boolean;
}

interface IStatus {
  readonly [created: string]: string;
}

const status: IStatus = {
  created: "Создан",
  done: "Выполнен",
  pending: "Готовится",
};

export default function Order({
  order,
  hasStatus = false,
}: IOrderProps): React.JSX.Element {
  const { ingredientsWithIdKey } = useSelector(getIngredientsByBategories);
  const location = useLocation();
  const { number, name, createdAt, ingredients } = order;
  const countOfIngredients = ingredients.length - 5;
  const date = dateFormated(createdAt);
  let totalPrice = 0;
  return (
    <li className={styles.order}>
      <Link
        to={`/feed/${number}`}
        className={styles.link}
        state={{ background: location }}
      >
        <div className={styles.header}>
          <div className={styles.order_ID}>{`#${number}`}</div>
          <div className={styles.order_date}>{date}</div>
        </div>
        <h4 className={styles.order_title}>{name}</h4>
        {hasStatus && (
          <p
            className={
              order.status === "done" ? styles.status_done : styles.status
            }
          >
            {status[order.status]}
          </p>
        )}
        <div className={styles.order_compound}>
          <div className={styles.order_ingredients}>
            {ingredients &&
              ingredients.map((id, index) => {
                totalPrice += ingredientsWithIdKey[id].price;
                if (index > 5) return;
                return (
                  <IconIngredient
                    src={ingredientsWithIdKey[id].image_mobile}
                    isLast={index === 5}
                    count={countOfIngredients}
                    key={index}
                  />
                );
              })}
          </div>
          <div className={styles.order_price}>
            <p className={styles.price}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}
