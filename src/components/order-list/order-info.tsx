import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-info.module.css";
import IconIngredient from "./icon-ingredient";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getFeedOrdersState } from "../../services/feed-orders/selectors";
import { getOrdersProfileState } from "../../services/profile-orders/selectors";
import { IOrder } from "../../services/feed-orders/actions";
import { getOrderAction, hideOrder } from "../../services/order/actions";
import { getResponseOrder } from "../../services/order/selector";
import { useEffect } from "react";
import { getIngredientsByBategories } from "../../services/ingredients/selectors";

export default function OrderInfo(): JSX.Element {
  const { number } = useParams();
  const dispatch = useDispatch();
  const { orderState } = useSelector(getResponseOrder);
  const { feedOrders } = useSelector(getFeedOrdersState);
  const { ordersProfile } = useSelector(getOrdersProfileState);
  const { ingredientsWithIdKey } = useSelector(getIngredientsByBategories);
  const num = Number(number);
  let order: IOrder | null = orderState;

  if (!order) {
    feedOrders &&
      (order = feedOrders.filter((order: IOrder) => order.number == num));
  }
  if (!order) {
    ordersProfile &&
      (order = ordersProfile.filter((order: IOrder) => order.number == num));
  }
  useEffect(() => {
    if (num) {
      !order && dispatch(getOrderAction(num));
    }
    return () => {
      dispatch(hideOrder());
    };
  }, []);
  console.log(order);

  if (order?.ingredients) {
    const countIngredients = order.ingredients.reduce(
      (obj: { [key: string]: number }, id: string) => {
        if (!obj[id]) {
          obj[id] = 1;
        } else {
          ++obj[id];
        }
        return obj;
      },
      {}
    );

    return (
      <div className={styles.content}>
        <p className={styles.order_number}>#{order.number}</p>
        <h4 className={styles.order_title}>{order.name}</h4>
        <p
          className={
            order.status === "done" ? styles.status_done : styles.status
          }
        >
          {order.status}
        </p>
        <p className={styles.compound}>Состав</p>
        <ul className={styles.ingredients_list}>
          {order.ingredients.map((id, key) => {
            if (!countIngredients[id]) return;
            let count = countIngredients[id];
            delete countIngredients[id];
            return (
              <li className={styles.ingredient} key={key}>
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
          })}
        </ul>
        <div className={styles.footer}>
          <div className={styles.order_date}>Вчера, 13:30</div>
          <div className={styles.total_price}>
            <span>510</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  } else return <p>Произошла ошибка. Повторите позже</p>;
}
