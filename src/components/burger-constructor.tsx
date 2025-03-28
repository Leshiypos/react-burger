import styles from "./burger-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "./modal";
import OrderDetails from "./order-details";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  addBuns,
  deleteIngredient,
  resetIngredients,
} from "../services/burger-constructor/actions";
import { getBurgerConsctructorIngredients } from "../services/burger-constructor/selectors";
import DragItemElement from "./drag-item-element";
import { useState } from "react";
import { hideOrder } from "../services/order/actions";
import { getUser } from "../services/user/selector";
import { useNavigate } from "react-router-dom";
import { IConstructorIngredient } from "../util/types";
import { useDispatch, useSelector } from "../hooks/hooks";

interface IUser {
  user: { email: string; name: string };
}
type TSelectIngredients = IConstructorIngredient & { key: string };
interface IGetBurgerConsctructorIngredients {
  ingredients: TSelectIngredients[];
  bun: IConstructorIngredient;
  total: number;
}

export default function BurgerConstructor(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user }: IUser = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredients, bun, total }: IGetBurgerConsctructorIngredients =
    useSelector(getBurgerConsctructorIngredients);
  const [, bunsRef] = useDrop({
    accept: "bun",
    drop(item: IConstructorIngredient) {
      dispatch(addBuns(item));
    },
  });
  const [, constIngrRef] = useDrop({
    accept: "ingredient",
    drop(item: IConstructorIngredient) {
      dispatch(addIngredient(item));
    },
  });
  const handleDeleteIngredient = (elem: TSelectIngredients): void => {
    dispatch(deleteIngredient(elem));
  };

  const handleModalClose = () => {
    setIsOpen(false);
    dispatch(resetIngredients());
    dispatch(hideOrder());
  };
  const handleOrderStart = () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsOpen(true);
    }
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
          <div
            className={styles.no_bun_top}
            ref={bunsRef}
            data-testid="drop_wrap_buns"
          >
            Выберите булку
          </div>
        )}

        <div
          className={styles.work_area}
          ref={constIngrRef}
          data-testid="drop_wrap_souces"
        >
          {ingredients?.length > 0 ? (
            ingredients.map((elem, index) => (
              <DragItemElement index={index} key={elem.key} id={elem.key}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={elem.name}
                  price={elem.price}
                  thumbnail={elem.image_large}
                  handleClose={() => handleDeleteIngredient(elem)}
                />
              </DragItemElement>
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
          onClick={handleOrderStart}
          disabled={!bun}
          data-testid="order_button"
        >
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal title="" onClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
