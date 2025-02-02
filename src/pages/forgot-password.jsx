import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from "react-router";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
  };
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <EmailInput name={"email"} value={email} onChange={onChange} />
      <Button
        extraClass={styles.button}
        htmlType="button"
        type="primary"
        size="large"
      >
        Восстановить
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
