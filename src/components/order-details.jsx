import styles from "./order-details.module.css";
import img from "../images/done.svg";
import { useSelector } from "react-redux";
import { getResponseOrder } from "../services/order/selector";

export default function OrderDetails() {
  const { responseOrder } = useSelector(getResponseOrder);
  return (
    <div className={styles.order_details}>
      <div className={styles.score}>{responseOrder.order.number}</div>
      <div className={styles.description}>{responseOrder.name}</div>
      <img src={img} alt="" className={styles.img} />
      <div className={styles.message}>Ваш заказ начали готовить</div>
      <div className={styles.message_bottom}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}
