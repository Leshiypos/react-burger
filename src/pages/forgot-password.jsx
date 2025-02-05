import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../services/user/action";
import { Navigate } from "react-router-dom";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [respSuccess, setRespSuccess] = useState(false);
  const onChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
  };

  const onClick = () => {
    dispatch(forgotPassword(email, setRespSuccess));
  };
  return (
    <>
      {respSuccess && <Navigate to="/reset-password" />}
      <div className={styles.main}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <form className={styles.form}>
          <EmailInput name={"email"} value={email} onChange={onChange} />
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="primary"
            size="large"
            onClick={onClick}
          >
            Восстановить
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
