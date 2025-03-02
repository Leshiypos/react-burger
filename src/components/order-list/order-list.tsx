import React from "react";
import styles from "./order-list.module.css";
import { IMessage } from "../../services/feed-orders/actions";

interface IOrderListProps {
  children?: React.ReactNode;
  orders: IMessage;
}

export function OrderList({ orders }: IOrderListProps): React.JSX.Element {
  return <ul className={styles.wrap_area}></ul>;
}
