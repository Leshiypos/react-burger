import styles from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "./modal";
import OrderDetails from "./order-details";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  addBuns,
  deleteIngredient,
  RESET_INGREDIENTS,
} from "../services/burger-constructor/actions";
import { getBurgerConsctructorIngredients } from "../services/burger-constructor/selectors";
import { sendOrderAction } from "../services/order/actions";
import { getResponseOrder } from "../services/order/selector";

export default function BurgerConstructor({}) {
  const dispatch = useDispatch();
  const { ingredients, bun, total, request } = useSelector(
    getBurgerConsctructorIngredients
  );
  const { responseOrder } = useSelector(getResponseOrder);
  const [, bunsRef] = useDrop({
    accept: "bun",
    drop(item) {
      dispatch(addBuns(item));
    },
  });
  const [, constIngrRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient(item));
    },
  });
  const handleDeleteIngredient = (elem) => {
    dispatch(deleteIngredient(elem));
  };
  const handlePlaceAnOrder = () => {
    dispatch(sendOrderAction(request));
    dispatch({
      type: RESET_INGREDIENTS,
    });
  };

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.wrap}>
        {bun ? (
          <div className={styles.top} ref={bunsRef}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_large}
            />
          </div>
        ) : (
          <div className={styles.no_bun_top} ref={bunsRef}>
            Выберите булку
          </div>
        )}

        <div className={styles.work_area} ref={constIngrRef}>
          {ingredients?.length > 0 ? (
            ingredients.map((elem) => (
              <div key={elem.key}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={elem.name}
                  price={elem.price}
                  thumbnail={elem.image_large}
                  handleClose={() => handleDeleteIngredient(elem)}
                />
              </div>
            ))
          ) : (
            <div className={styles.no_ingredients}>Выберите ингредиент</div>
          )}
        </div>

        {bun ? (
          <div className={styles.bottom}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_large}
            />
          </div>
        ) : (
          <div className={styles.no_bun_bottom}>Выберите булку</div>
        )}
      </div>
      <div className={styles.order}>
        <div className={styles.currency}>
          {total} <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handlePlaceAnOrder}
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
      {responseOrder && (
        <Modal title="">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes).isRequired,
};
