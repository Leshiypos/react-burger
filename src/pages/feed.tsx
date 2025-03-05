import React, { useEffect } from "react";
import styles from "./feed.module.css";
import Order from "../components/order-list/order";
import { OrdersBoard } from "../components/orders-board/orders-board";
import { useDispatch } from "react-redux";
import { getFeedOrdersState } from "../services/feed-orders/selectors";
import { IOrder, onClose, wsConnect } from "../services/feed-orders/actions";
import { useSelector } from "../hooks/hooks";
import { WebsocketStatus } from "../util/types";

const wsUrlFeed = "wss://norma.nomoreparties.space/orders/all";

export default function Feed(): React.JSX.Element {
  const dispatch = useDispatch();
  const { wsConnected, feedOrders } = useSelector(getFeedOrdersState);
  const ready = wsConnected === WebsocketStatus.ONLINE && feedOrders;
  useEffect(() => {
    //@ts-ignore
    dispatch(wsConnect(wsUrlFeed));
    return () => {
      //@ts-ignore
      dispatch(onClose());
    };
  }, []);
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.h1}>Лента Заказов</h1>
        <ul className={styles.wrap_area}>
          {ready ? (
            feedOrders.map((elem: IOrder, index: string) => (
              <Order order={elem} key={index} />
            ))
          ) : (
            <p>Данные загружаются</p>
          )}
        </ul>
      </section>

      <section>
        <OrdersBoard />
      </section>
    </main>
  );
}
