import styles from "./order-details.module.css";
import img from "../images/done.svg";
import { getResponseOrder } from "../services/order/selector";
import Preloader from "./preload";
import React, { useEffect } from "react";
import { sendOrderAction } from "../services/order/actions";
import { getBurgerConsctructorIngredients } from "../services/burger-constructor/selectors";
import { useDispatch, useSelector } from "../hooks/hooks";

export default function OrderDetails(): React.JSX.Element {
  const dispatch = useDispatch();
  const { request } = useSelector(getBurgerConsctructorIngredients);
  useEffect(() => {
    dispatch(sendOrderAction(request));
  }, []);
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
      ) : responseOrder?.success ? (
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
