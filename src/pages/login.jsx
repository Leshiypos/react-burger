import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/user/action";
import { getUser } from "../services/user/selector";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector(getUser);
  const onChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const onClick = () => {
    dispatch(login(email, password));
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form}>
        <EmailInput name={"email"} value={email} onChange={onChange} />
        <PasswordInput
          name={"password"}
          value={password}
          onChange={onChange}
          extraClass="mb-2"
        />
        <Button
          extraClass={styles.button}
          htmlType="button"
          type="primary"
          size="large"
          onClick={onClick}
        >
          Войти
        </Button>
      </form>
      <div>
        {error && <p className={styles.error}>{error.message}</p>}
        <p className={styles.help}>
          Вы - новый пользователь?{" "}
          <Link to={"/register"} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.help}>
          Забыли пароль?{" "}
          <Link to={"/forgot-password"} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}
