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
import { refreshUserData } from "../services/user/action";

export default function ProfileForm() {
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("******");

  const checkDesabledButton = () => {
    if (name === user.name && email === user.email && password === "******") {
      return true;
    }
    return false;
  };

  const onChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const onSave = () => {
    let refreshData = { email, name, password };
    if (password === "******" || password === "") refreshData = { email, name };
    dispatch(refreshUserData(refreshData));
  };
  const onCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword("******");
  };
  const resetInput = () => {
    setPassword("");
  };
  const onBlur = () => {
    if (password === "") setPassword("******");
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
        onFocus={resetInput}
        onBlur={onBlur}
      />
      <div className={styles.wrap_button}>
        <Button
          extraClass={styles.button}
          htmlType="button"
          type="primary"
          size="large"
          onClick={onSave}
          disabled={checkDesabledButton()}
        >
          Сохранить
        </Button>
        <Button
          extraClass={styles.button_cancel}
          htmlType="button"
          type="primary"
          size="large"
          onClick={onCancel}
          disabled={checkDesabledButton()}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}
