import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/user/action";

export default function ResetPassword() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [respSuccess, setRespSuccess] = useState(false);
  const onChange = (e) => {
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "code") setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, code, setRespSuccess));
  };
  if (
    location.state === null ||
    location.state?.from !== "/forgot-password" ||
    location.state?.sendRequest === false
  ) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <>
      {respSuccess && <Navigate to="/login" />}
      <div className={styles.main}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            htmlType="submit"
            type="primary"
            size="large"
          >
            Сохранить
          </Button>
        </form>
        <div>
          <p className={styles.help}>
            Вспомнили пароль?{" "}
            <Link to={"/login"} className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
