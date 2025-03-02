import React, { useEffect } from "react";
import styles from "./feed.module.css";
import { Order } from "../components/order-list/order";
import { OrdersBoard } from "../components/orders-board/orders-board";
import { useDispatch } from "react-redux";
import { getFeedOrdersState } from "../services/feed-orders/selectors";
import {
  IOrder,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/feed-orders/actions";
import { useSelector } from "../hooks/hooks";
import { WebsocketStatus } from "../util/types";

export default function Feed(): React.JSX.Element {
  const dispatch = useDispatch();
  const { wsConnected, feedOrders } = useSelector(getFeedOrdersState);
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);
  //   feedOrders.map((elem) => console.log(elem));
  //   console.log(feedOrders);
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.h1}>Лента Заказов</h1>
        {wsConnected == WebsocketStatus.ONLINE && feedOrders ? (
          <ul className={styles.wrap_area}>
            {feedOrders.map((elem: IOrder) => {
              <Order order={elem} />;
            })}
          </ul>
        ) : (
          "Нет данных"
        )}
      </section>

      <section>
        <OrdersBoard />
      </section>
    </main>
  );
}
