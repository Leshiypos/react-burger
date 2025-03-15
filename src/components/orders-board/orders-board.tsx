import { useSelector } from "../../hooks/hooks";
import { IOrder } from "../../services/feed-orders/actions";
import { getFeedOrdersState } from "../../services/feed-orders/selectors";
import { WebsocketStatus } from "../../util/types";
import styles from "./orders-board.module.css";

export function OrdersBoard(): React.JSX.Element {
  const { wsConnected, feedOrders, total, totalToday } =
    useSelector(getFeedOrdersState);
  const ready = wsConnected === WebsocketStatus.ONLINE && feedOrders;
  return (
    <>
      <div className={styles.state}>
        <div>
          <h3 className={styles.title}>Готовы:</h3>
          <ul className={styles.orders_list}>
            {ready ? (
              feedOrders
                .filter((order: IOrder) => order.status == "done")
                .map((order: IOrder, index: number) => {
                  if (index > 10) return;
                  return (
                    <li className={styles.order_id_ready} key={index}>
                      {order.number}
                    </li>
                  );
                })
            ) : (
              <p>Данные загружаются....</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>В работе:</h3>
          <ul className={styles.orders_list}>
            {ready ? (
              feedOrders
                .filter((order: IOrder) => order.status != "done")
                .map((order: IOrder, index: number) => (
                  <li className={styles.order_id_at_work} key={index}>
                    {order.number}
                  </li>
                ))
            ) : (
              <p>Данные загружаются....</p>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.statistics}>
        <h3 className={styles.title_stat}>Выполнено за все время:</h3>

        {ready ? (
          <p className={styles.score}>{total}</p>
        ) : (
          "Данные загружаются...."
        )}
      </div>
      <div className={styles.statistics}>
        <h3 className={styles.title_stat}>Выполнено за сегодня:</h3>

        {ready ? (
          <p className={styles.score}>{totalToday}</p>
        ) : (
          "Данные загружаются...."
        )}
      </div>
    </>
  );
}
