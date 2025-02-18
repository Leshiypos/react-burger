import { RingLoader } from "react-spinners";
import styles from "./preload.module.css";

export default function Preloader() {
  return (
    <div className={styles.preloader}>
      <RingLoader size={150} color={"#4C4CFF"} />
    </div>
  );
}
