import { RingLoader } from "react-spinners";
import styles from "./preload.module.css";
import React from "react";

export default function Preloader(): React.JSX.Element {
  return (
    <div className={styles.preloader}>
      <RingLoader size={150} color={"#4C4CFF"} />
    </div>
  );
}
