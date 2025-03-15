import React, { useEffect } from "react";
import styles from "./orders-profile.module.css";
import Order from "../components/order-list/order";
import { getOrdersProfileState } from "../services/profile-orders/selectors";
import { IOrder } from "../services/feed-orders/actions";
import { useDispatch, useSelector } from "../hooks/hooks";
import { WebsocketStatus } from "../util/types";
import {
  onCloseProfile,
  wsConnectProfile,
} from "../services/profile-orders/actions";

export default function OrdersProfile(): React.JSX.Element {
  const dispatch = useDispatch();
  const { wsConnectedProfile, ordersProfile } = useSelector(
    getOrdersProfileState
  );
  const ready = wsConnectedProfile === WebsocketStatus.ONLINE && ordersProfile;

  useEffect(() => {
    const token: string | undefined = localStorage
      ?.getItem("accessToken")
      ?.replace("Bearer ", "");
    const wssUrlProfile = `wss://norma.nomoreparties.space/orders?token=${token}`;
    dispatch(wsConnectProfile(wssUrlProfile));
    console.log(wssUrlProfile);
    return () => {
      dispatch(onCloseProfile());
    };
  }, []);
  return (
    <div className={styles.orders_wrap}>
      <section>
        <ul className={styles.wrap_area}>
          {ready ? (
            ordersProfile.map((elem: IOrder, index: number) => (
              <Order order={elem} key={index} hasStatus={true} />
            ))
          ) : (
            <p>Данные загружаются</p>
          )}
        </ul>
      </section>
    </div>
  );
}
