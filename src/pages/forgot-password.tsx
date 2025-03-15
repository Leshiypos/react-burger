import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from "react-router";
import React, { useState } from "react";
import { forgotPassword } from "../services/user/action";
import { Navigate, useLocation } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { IUseForm } from "../util/types";
import { useDispatch } from "../hooks/hooks";

export default function ForgotPassword(): React.JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();
  const [respSuccess, setRespSuccess] = useState<boolean>(false);
  const { values, handleChange } = useForm<Omit<IUseForm, "name" | "password">>(
    { email: "" }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(values.email, setRespSuccess));
  };
  return (
    <>
      {respSuccess && (
        <Navigate
          to="/reset-password"
          state={{ sendRequest: respSuccess, from: location.pathname }}
        />
      )}
      <div className={styles.main}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <EmailInput
            name={"email"}
            value={values.email}
            onChange={handleChange}
          />
          <Button
            extraClass={styles.button}
            htmlType="submit"
            type="primary"
            size="large"
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
