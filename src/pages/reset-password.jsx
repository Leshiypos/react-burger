import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router";
import { useState } from "react";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "code") setCode(e.target.value);
  };
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <PasswordInput
        name={"password"}
        value={password}
        onChange={onChange}
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={code}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Button
        extraClass={styles.button}
        htmlType="button"
        type="primary"
        size="large"
      >
        Сохранить
      </Button>
      <div>
        <p className={styles.help}>
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
