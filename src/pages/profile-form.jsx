import styles from "./profile-form.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/user/selector";
import { refreshUserData } from "../services/user/action";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("******");
  const checkDesabledButton = useCallback(() => {
    if (name === user.name && email === user.email && password === "******") {
      return true;
    }
    return false;
  }, [name, email, password, user]);

  const onChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let refreshData = { email, name, password };
    if (password === "******" || password === "") refreshData = { email, name };
    dispatch(refreshUserData(refreshData));
  };
  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword("******");
  };
  const handleResetInput = () => {
    setPassword("");
  };
  const handleBlur = () => {
    if (password === "") setPassword("******");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        onFocus={handleResetInput}
        onBlur={handleBlur}
      />

      {!checkDesabledButton() && (
        <div className={styles.wrap_button}>
          <Button
            extraClass={styles.button}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Сохранить
          </Button>
          <Button
            extraClass={styles.button_cancel}
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
}
