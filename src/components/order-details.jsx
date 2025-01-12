import styles from "./order-details.module.css";
import img from "../images/done.svg";
import { useDispatch, useSelector } from "react-redux";
import { getResponseOrder } from "../services/order/selector";
import Preloader from "./preload";
import { useEffect } from "react";
import { HIDE_ORDER, sendOrderAction } from "../services/order/actions";
import { RESET_INGREDIENTS } from "../services/burger-constructor/actions";
import { getBurgerConsctructorIngredients } from "../services/burger-constructor/selectors";

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { request } = useSelector(getBurgerConsctructorIngredients);
  useEffect(() => {
    dispatch(sendOrderAction(request));
    dispatch({
      type: RESET_INGREDIENTS,
    });
    return () => {
      dispatch({
        type: HIDE_ORDER,
      });
    };
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
