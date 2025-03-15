import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../services/user/selector";
import Preloader from "./preload";
import React from "react";
import { useSelector } from "../hooks/hooks";

interface IProtectedProps {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
}
interface IOnlyUnAuthProps {
  component: React.JSX.Element;
}

const Protected = ({
  onlyUnAuth = false,
  component,
}: IProtectedProps): React.JSX.Element => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const { isAuthChecked, user } = useSelector(getUser);
  const location = useLocation();
  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component,
}: IOnlyUnAuthProps): React.JSX.Element => (
  <Protected onlyUnAuth={true} component={component} />
);
