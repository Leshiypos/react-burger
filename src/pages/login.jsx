import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../services/user/action";
import { useForm } from "../hooks/useForm";

export default function Login() {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
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
        />
        <PasswordInput
          name={"password"}
          value={values.password}
          onChange={handleChange}
          extraClass="mb-2"
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
