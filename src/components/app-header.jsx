import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
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
            to="/login"
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

AppHeader.propTypes = {
  active: PropTypes.oneOf(["consctructor", "order", "account"]),
};
