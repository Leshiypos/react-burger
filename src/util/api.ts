import { IRegister } from "../services/user/action";
import { BASE_URL } from "./constants";

interface IRefreshToken{
	refreshToken: string,
	accessToken: string,
	success: boolean
}
export interface IOptionsFetch{
	method?: string,
	headers?:{[key:string]:string} | undefined,
	body?: string
}
const checkResponse = <T>(response: Response):Promise<T> => {
	return response.ok ? response.json() : response.json().then( e => Promise.reject(e) );
}


  export const request = async <T>(endpoint: string , options:IOptionsFetch={}): Promise<T> => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse<T>)
  }


  // Обновление токена

  export const refreshToken = async(): Promise<IRefreshToken> => {
	return request<IRefreshToken>(`/auth/token`, {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json;charset=utf-8",
	  },
	  body: JSON.stringify({
		token: localStorage.getItem("refreshToken"),
	  }),
	})
	 // !! Важно для обновления токена в мидлваре, чтобы запись токенов
	 // была тут, а не в fetchWithRefresh
	.then((refreshData) => {
	  if (!refreshData.success) {
		  return Promise.reject(refreshData);
		}
	  localStorage.setItem("refreshToken", refreshData.refreshToken); 
	  localStorage.setItem("accessToken", refreshData.accessToken);
	  return refreshData;
	});
  };

export const fetchWithRefresh = async (url:string, options:IOptionsFetch={}) : Promise<Omit<IRegister,"accessToken" |"refreshToken" >> => {
	try {
	  return await request(url, options);
	} catch (err) {
	  if ((err as {message: string}).message === "jwt expired") {
		const refreshData = await refreshToken(); //обновляем токен
		if(options.headers){
			options.headers.authorization = refreshData.accessToken;
		}
		
		return await request(url, options); //повторяем запрос
	  } else {
		return Promise.reject(err);
	  }
	}
  };