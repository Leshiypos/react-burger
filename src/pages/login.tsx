import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router";
import React, { useState } from "react";
import { login } from "../services/user/action";
import { useForm } from "../hooks/useForm";
import { IUseForm } from "../util/types";
import { useDispatch } from "../hooks/hooks";

export default function Login(): React.JSX.Element {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm<Omit<IUseForm, "name">>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    dispatch(login(email, password, setErrorMessage));
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          name={"email"}
          value={values.email}
          onChange={handleChange}
          data-testid="email_input"
        />
        <PasswordInput
          name={"password"}
          value={values.password}
          onChange={handleChange}
          extraClass="mb-2"
          data-testid="password_input"
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="large"
        >
          Войти
        </Button>
      </form>
      <div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
