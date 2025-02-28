import styles from "./orders-board.module.css";
export function OrdersBoard(): React.JSX.Element {
  return (
    <>
      <div className={styles.state}>
        <div>
          <h3 className={styles.title}>Готовы:</h3>
          <ul className={styles.orders_list}>
            <li className={styles.order_id_ready}>034533</li>
            <li className={styles.order_id_ready}>034533</li>
            <li className={styles.order_id_ready}>034533</li>
            <li className={styles.order_id_ready}>034533</li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>В работе:</h3>
          <ul className={styles.orders_list}>
            <li className={styles.order_id_at_work}>034533</li>
            <li className={styles.order_id_at_work}>034533</li>
            <li className={styles.order_id_at_work}>034533</li>
          </ul>
        </div>
      </div>
      <div className={styles.statistics}>
        <h3 className={styles.title_stat}>Выполнено за все время:</h3>
        <p className={styles.score}>28 752</p>
      </div>
      <div className={styles.statistics}>
        <h3 className={styles.title_stat}>Выполнено за сегодня:</h3>
        <p className={styles.score}>138</p>
      </div>
    </>
  );
}
