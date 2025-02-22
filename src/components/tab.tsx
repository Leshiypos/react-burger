import { ReactNode } from "react";
import styles from "./tab.module.css";

interface ITabProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export default function Tab({
  children,
  isActive,
  onClick,
}: ITabProps): React.JSX.Element {
  return (
    <li
      onClick={onClick}
      className={isActive ? styles.tab : `${styles.tab} ${styles.inActive}`}
    >
      {children}
    </li>
  );
}
