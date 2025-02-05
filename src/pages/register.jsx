import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../services/user/action";
import { useNavigate, Navigate } from "react-router-dom";
import { getUser } from "../services/user/selector";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector(getUser);
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
    dispatch(register({ email, password, name }));
  };
  console.log(error);
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
        {error && <p className={styles.error}>{error.message}</p>}
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
