import styles from "./profile-form.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback } from "react";
import { getUser } from "../services/user/selector";
import { refreshUserData } from "../services/user/action";
import { useForm } from "../hooks/useForm";
import { IUseForm } from "../util/types";
import { useDispatch, useSelector } from "../hooks/hooks";

export type TrefreshData = Omit<IUseForm, "password"> & { password?: string };

export default function ProfileForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);

  const { values, setValues, handleChange } = useForm<IUseForm>({
    name: user.name,
    email: user.email,
    password: "******",
  });

  const checkDesabledButton = useCallback(() => {
    if (
      values.name === user.name &&
      values.email === user.email &&
      values.password === "******"
    ) {
      return true;
    }
    return false;
  }, [values.name, values.email, values.password, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, name, password } = values;

    let refreshData: TrefreshData = { email, name, password };
    if (password === "******" || password === "") refreshData = { email, name };

    dispatch(refreshUserData(refreshData));
  };
  const handleCancel = (): void => {
    setValues({
      name: user.name,
      email: user.email,
      password: "******",
    });
  };
  const handleResetInput = (): void => {
    setValues({ ...values, password: "" });
  };
  const handleBlur = (): void => {
    if (values.password === "") setValues({ ...values, password: "******" });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        icon={"EditIcon"}
      />
      <EmailInput
        name={"email"}
        value={values.email}
        onChange={handleChange}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        name={"password"}
        value={values.password}
        onChange={handleChange}
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
