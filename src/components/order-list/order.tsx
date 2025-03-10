import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { IOrder } from "../../services/feed-orders/actions";
import { useSelector } from "../../hooks/hooks";
import { getIngredientsByBategories } from "../../services/ingredients/selectors";
import IconIngredient from "./icon-ingredient";
import { Link, useLocation } from "react-router-dom";
import { status } from "../../util/constants";

interface IOrderProps {
  order: IOrder;
  hasStatus?: boolean;
}

export default function Order({
  order,
  hasStatus = false,
}: IOrderProps): React.JSX.Element | null {
  const { ingredientsWithIdKey } = useSelector(getIngredientsByBategories);
  const location = useLocation();
  const { number, name, createdAt, ingredients } = order;
  const countOfIngredients = ingredients.length - 5;
  const date = new Date(Date.parse(createdAt));
  let totalPrice = 0;
  let showComponent = true;
  ingredients.forEach((element) => {
    if (ingredientsWithIdKey[element] === undefined) {
      showComponent = false;
    }
  });

  if (!showComponent || !number || !name || !createdAt) {
    return null;
  }
  return (
    <li className={styles.order}>
      <Link
        to={`${number}`}
        className={styles.link}
        state={{ background: location }}
      >
        <div className={styles.header}>
          <div className={styles.order_ID}>{`#${number}`}</div>
          <div className={styles.order_date}>
            <FormattedDate date={date} />
          </div>
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
