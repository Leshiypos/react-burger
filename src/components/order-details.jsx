import styles from "./order-details.module.css";
import img from "../images/done.svg";
import { useSelector } from "react-redux";
import { getResponseOrder } from "../services/order/selector";
import Preloader from "./preload";

export default function OrderDetails() {
  const { error, loading, responseOrder } = useSelector(getResponseOrder);
  return (
    <div className={styles.order_details}>
      {loading ? (
        <Preloader />
      ) : error ? (
        <>
          <div className={styles.score}>Упс...что то пошло не так</div>
          <div className={styles.description}>Пожалуйста, повторите заказ</div>
        </>
      ) : responseOrder.success ? (
        <>
          <div className={styles.score}>{responseOrder.order.number}</div>
          <div className={styles.description}>{responseOrder.name}</div>
          <img src={img} alt="done" className={styles.img} />
          <div className={styles.message}>Ваш заказ начали готовить</div>
          <div className={styles.message_bottom}>
            Дождитесь готовности на орбитальной станции
          </div>
        </>
      ) : (
        <>
          <div className={styles.score}>Упс...что то пошло не так</div>
          <div className={styles.description}>Пожалуйста, повторите заказ</div>
        </>
      )}
    </div>
  );
}
