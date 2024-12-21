//@ts-nocheck
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ButtonMenu from "./button-menu";
import styles from "./app-header.module.css";
import PropTypes from "prop-types";

export default function AppHeader({ active, onChange }) {
  return (
    <header className={styles.header + " pt-4 pb-4"}>
      <div className={styles.conteiner}>
        <div className="flex">
          <ButtonMenu
            isActive={active === "consctructor"}
            onClick={() => onChange("consctructor")}
          >
            <BurgerIcon type="primary" />
            Конструктор
          </ButtonMenu>
          <ButtonMenu
            isActive={active === "order"}
            onClick={() => onChange("order")}
          >
            <ListIcon type="primary" />
            Лента заказов
          </ButtonMenu>
        </div>
        <Logo className={styles.logo} />
        <ButtonMenu
          isActive={active === "account"}
          onClick={() => onChange("account")}
        >
          <ProfileIcon type="primary" />
          Личный кaбинет
        </ButtonMenu>
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  active: PropTypes.oneOf(["consctructor", "order", "account"]),
  onChange: PropTypes.func.isRequired,
};
