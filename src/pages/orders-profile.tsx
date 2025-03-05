import React, { useEffect } from "react";
import styles from "./orders-profile.module.css";
import Order from "../components/order-list/order";
import { useDispatch } from "react-redux";
import { getOrdersProfileState } from "../services/profile-orders/selectors";
import { IOrder } from "../services/feed-orders/actions";
import { useSelector } from "../hooks/hooks";
import { WebsocketStatus } from "../util/types";
import {
  onCloseProfile,
  wsConnectProfile,
} from "../services/profile-orders/actions";

let wssUrlProfile = "";
if (localStorage.getItem("accessToken")) {
  //@ts-ignore
  const token: string = localStorage
    .getItem("accessToken")
    .replace("Bearer ", "");
  wssUrlProfile = `wss://norma.nomoreparties.space/orders?token=${token}`;
}
console.log(wssUrlProfile);
export default function OrdersProfile(): React.JSX.Element {
  const dispatch = useDispatch();
  const { wsConnectedProfile, ordersProfile } = useSelector(
    getOrdersProfileState
  );
  const ready = wsConnectedProfile === WebsocketStatus.ONLINE && ordersProfile;

  useEffect(() => {
    //@ts-ignore
    dispatch(wsConnectProfile(wssUrlProfile));
    return () => {
      //@ts-ignore
      dispatch(onCloseProfile());
    };
  }, []);
  return (
    <div className={styles.orders_wrap}>
      <section>
        <ul className={styles.wrap_area}>
          {ready ? (
            ordersProfile.map((elem: IOrder, index: string) => (
              <Order order={elem} key={index} />
            ))
          ) : (
            <p>Данные загружаются</p>
          )}
        </ul>
      </section>
    </div>
  );
}
