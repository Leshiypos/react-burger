import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { logout } from "../services/user/action";
import React from "react";

export default function Profile(): React.JSX.Element {
  const dispatch = useDispatch();
  const handleLogout = (): void => {
    //@ts-ignore
    dispatch(logout());
  };
  return (
    <div className={styles.main}>
      <div className={styles.left_panel}>
        <ul className={styles.nav_panel}>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.nav_link} ${styles.nav_link_active}`
                  : `${styles.nav_link}`
              }
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive
                  ? `${styles.nav_link} ${styles.nav_link_active}`
                  : `${styles.nav_link}`
              }
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <Button
              htmlType="button"
              type="secondary"
              size="large"
              extraClass={styles.logout_but}
              onClick={handleLogout}
            >
              Выход
            </Button>
          </li>
        </ul>
      </div>
      <div className={styles.right_panel}>
        <Outlet />
      </div>
    </div>
  );
}
