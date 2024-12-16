//@ts-nocheck
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ButtonMenu from "./button-menu";
import styles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header + " pt-4 pb-4"}>
      <div className={styles.conteiner}>
        <div className="flex">
          <ButtonMenu isAcive={true}>
            <BurgerIcon type="primary" />
            Конструктор
          </ButtonMenu>
          <ButtonMenu>
            <ListIcon type="primary" />
            Лента заказов
          </ButtonMenu>
        </div>
        <Logo className={styles.logo} />
        <ButtonMenu>
          <ProfileIcon type="primary" />
          Личный кaбинет
        </ButtonMenu>
      </div>
    </header>
  );
}
