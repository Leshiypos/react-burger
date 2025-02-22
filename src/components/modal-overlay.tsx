import React from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClick: () => void;
}

export default function ModalOverlay(
  props: IModalOverlayProps
): React.JSX.Element {
  return <div className={styles.overlay} {...props}></div>;
}
