import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../services/user/action";

export default function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const onChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const onClick = () => {
    dispatch(register({ email, password, name }, setErrorMessage));
  };
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput name={"email"} value={email} onChange={onChange} />
        <PasswordInput name={"password"} value={password} onChange={onChange} />
        <Button
          extraClass={styles.button}
          htmlType="button"
          type="primary"
          size="large"
          onClick={onClick}
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
