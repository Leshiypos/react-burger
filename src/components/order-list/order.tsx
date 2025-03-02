import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { IOrder } from "../../services/feed-orders/actions";

interface IOrderProps {
  order: IOrder;
}

export default function Order({ order }: IOrderProps): React.JSX.Element {
  return (
    <li className={styles.order}>
      <div className={styles.header}>
        <div className={styles.order_ID}>#034535</div>
        <div className={styles.order_date}>Сегодня, 16:20</div>
      </div>
      <h4 className={styles.order_title}>Death Star Starship Main бургер</h4>
      <div className={styles.order_compound}>
        <div className={styles.order_ingredients}>
          <div className={styles.ingredient_icon}>
            <div>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-04-mobile.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.ingredient_icon}>
            <div>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.ingredient_icon}>
            <div>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.ingredient_icon}>
            <div>
              <img
                src="https://code.s3.yandex.net/react/code/meat-03-mobile.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.ingredient_icon}>
            <div>
              <img
                src="https://code.s3.yandex.net/react/code/salad-mobile.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.ingredient_icon}>
            <div>
              <img
                src="https://code.s3.yandex.net/react/code/core-mobile.png"
                alt=""
              />
            </div>
            <span className={styles.count}>+3</span>
          </div>
        </div>
        <div className={styles.order_price}>
          <p className={styles.price}>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}
