import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

export default function AppHeader(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.conteiner}>
        <div className={styles.flex}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.button} ${styles.active}`
                : `${styles.button}`
            }
          >
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
          <NavLink
            to="/order-tape"
            className={({ isActive }) =>
              isActive
                ? `${styles.button} ${styles.active}`
                : `${styles.button}`
            }
          >
            <ListIcon type="primary" />
            Лента заказов
          </NavLink>
        </div>
        <Logo className={styles.logo} />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.button} ${styles.active}` : `${styles.button}`
          }
        >
          <ProfileIcon type="primary" />
          Личный кaбинет
        </NavLink>
      </div>
    </header>
  );
}
