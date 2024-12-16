import styles from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../util/data.js";

export default function BurgerConstructor() {
  const img = "https://code.s3.yandex.net/react/code/bun-02-large.png";
  return (
    <div className={styles.burger_constructor}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className={styles.top}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={styles.work_area}>
          {data.map((elem) => (
            <div key={elem._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image_large}
              />
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.currency}>
          610 <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}
