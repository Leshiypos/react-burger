import React from "react";
import styles from "./order-list.module.css";

interface IOrderListProps {
  children?: React.ReactNode;
  renderProps: React.JSX.Element;
}

export function OrderList({ renderProps }: IOrderListProps): React.JSX.Element {
  return (
    <ul className={styles.wrap_area}>
      {renderProps}
      {renderProps}
      {renderProps}
      {renderProps}
      {renderProps}
      {renderProps}
    </ul>
  );
}
