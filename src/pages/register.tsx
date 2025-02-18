import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../services/user/action";
import { useForm } from "../hooks/useForm";
import { IUseForm } from "../util/types";

export default function Register(): React.JSX.Element {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm<IUseForm>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password, name } = values;
    //@ts-ignore
    dispatch(register({ email, password, name }, setErrorMessage));
  };
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          name={"email"}
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name={"password"}
          value={values.password}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="large"
        >
          Зарегистрироваться
        </Button>
      </form>
      <div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <p className={styles.help}>
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
