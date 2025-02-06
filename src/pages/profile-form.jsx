import styles from "./profile-form.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/user/selector";

export default function ProfileForm() {
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("******");

  const onChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const onClick = () => {
    dispatch(register({ email, password, name }));
  };
  return (
    <form className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        icon={"EditIcon"}
        disabled={true}
      />
      <EmailInput
        name={"email"}
        value={email}
        onChange={onChange}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        name={"password"}
        value={password}
        onChange={onChange}
        icon={"EditIcon"}
      />
      <Button
        extraClass={styles.button}
        htmlType="button"
        type="primary"
        size="large"
        onClick={onClick}
      >
        Сохранить
      </Button>
    </form>
  );
}
