import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Регистрация</h1>
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
      >
        Зарегистрироваться
      </Button>
      <div>
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
