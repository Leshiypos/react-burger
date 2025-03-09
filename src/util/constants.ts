export const BASE_URL = "https://norma.nomoreparties.space/api";

interface IStatus {
	readonly [created: string]: string;
  }

export const status: IStatus = {
	created: "Создан",
	done: "Выполнен",
	pending: "Готовится",
  };