import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-info.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getFeedOrdersState } from "../../services/feed-orders/selectors";
import { getOrdersProfileState } from "../../services/profile-orders/selectors";
import { IOrder } from "../../services/feed-orders/actions";
import { getOrderAction, hideOrder } from "../../services/order/actions";
import { getResponseOrder } from "../../services/order/selector";
import { useEffect, useState } from "react";
import { getIngredientsByBategories } from "../../services/ingredients/selectors";
import IngredientInfo from "./ingredient-info";
import { status } from "../../util/constants";

interface ICountIngredients {
  [key: string]: number;
}

export default function OrderInfo(): JSX.Element {
  const { number } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<IOrder | null>(null);
  const { orderState } = useSelector(getResponseOrder);
  const { feedOrders } = useSelector(getFeedOrdersState);
  const { ordersProfile } = useSelector(getOrdersProfileState);
  const { ingredientsWithIdKey } = useSelector(getIngredientsByBategories);
  const num = Number(number);

  useEffect(() => {
    if (orderState) {
      setOrder(orderState);
    }
    if (!order) {
      if (
        feedOrders &&
        feedOrders.filter((order: IOrder) => order.number == num).length
      ) {
        setOrder(feedOrders.filter((order: IOrder) => order.number == num)[0]);
      } else if (
        ordersProfile &&
        ordersProfile.filter((order: IOrder) => order.number == num).length
      ) {
        setOrder(
          ordersProfile.filter((order: IOrder) => order.number == num)[0]
        );
      } else if (!orderState) {
        if (num) {
          !order && dispatch(getOrderAction(num));
        }
      }
    }

    return () => {
      dispatch(hideOrder());
    };
  }, [orderState]);

  let countIngredients: ICountIngredients | null = null;
  let totalPrice = 0;
  if (order) {
    countIngredients = order.ingredients.reduce(
      (obj: ICountIngredients, id: string) => {
        if (!obj[id]) {
          obj[id] = 1;
        } else {
          ++obj[id];
        }
        return obj;
      },
      {}
    );
  }

  if (order) {
    const date = new Date(Date.parse(order.createdAt));
    return (
      <div className={styles.content}>
        <p className={styles.order_number}>#{order.number}</p>
        <h4 className={styles.order_title}>{order.name}</h4>
        <p
          className={
            order.status === "done" ? styles.status_done : styles.status
          }
        >
          {status[order.status]}
        </p>
        <p className={styles.compound}>Состав</p>
        <ul className={styles.ingredients_list}>
          {order.ingredients.map((id, key) => {
            totalPrice += ingredientsWithIdKey[id].price;
            let count: number | null = null;
            if (countIngredients) {
              if (!countIngredients[id]) return;
              count = countIngredients[id];
              delete countIngredients[id];
            }
            return <IngredientInfo count={count} id={id} key={key} />;
          })}
        </ul>
        <div className={styles.footer}>
          <div className={styles.order_date}>
            <FormattedDate date={date} />
          </div>
          <div className={styles.total_price}>
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  } else return <p>Произошла ошибка. Повторите позже</p>;
}
