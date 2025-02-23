import React from "react";
import styles from "./feed.module.css";
import { OrderList } from "../components/order-list/order-list";
import { Order } from "../components/order-list/order";
import { OrdersBoard } from "../components/orders-board/orders-board";

export default function Feed(): React.JSX.Element {
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.h1}>Лента Заказов</h1>
        <OrderList renderProps={<Order />}>
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
        </OrderList>
      </section>

      <section>
        <OrdersBoard />
      </section>
    </main>
  );
}
