import styles from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "./modal";
import OrderDetails from "./order-details";
import { useState } from "react";
import PropTypes from "prop-types";
import dataPropTypes from "../util/type.js";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_INGREDIENT,
  addIngredient,
  addBuns,
  deleteIngredient,
} from "../services/constructor/actions";

export default function BurgerConstructor({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.constructor.ingredients);
  const bun = useSelector((store) => store.constructor.bun);
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
  const handleClose = (key) => {
    dispatch(deleteIngredient(key));
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
                  handleClose={() => handleClose(elem.key)}
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
          610 <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal
          title=""
          isOpen={isModalOpen}
          onClick={(current) => setIsModalOpen(current)}
        >
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes).isRequired,
};
