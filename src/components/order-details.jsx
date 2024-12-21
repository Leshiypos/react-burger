import styles from "./order-details.module.css";
import img from "../images/done.svg";

export default function OrderDetails() {
  return (
    <div className={styles.order_details}>
      <div className={styles.score}>034536</div>
      <div className={styles.description}>Описание заказа</div>
      <img src={img} alt="" className={styles.img} />
      <div className={styles.message}>Ваш заказ начали готовить</div>
      <div className={styles.message_bottom}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}
