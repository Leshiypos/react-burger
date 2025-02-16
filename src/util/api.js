import { BASE_URL } from "./constants";

const checkResponse = (response) => {
	return response.ok ? response.json() : response.json().then( e => Promise.reject(e) );
}

// export const getIngredients = async () => {
// 	return fetch(`${BASE_URL}/ingredients`)
// 		.then(checkResponse);
//   };



// export const sendOrder = async (request) => {
// 	return fetch(`${BASE_URL}/orders`,{
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(request)
// 	})
// 		.then(checkResponse);
//   };

  export const request = async (endpoint , options={}) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
  }


  // Обновление токена

  const refreshToken = async() => {
	return request(`/auth/token`, {
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

export const fetchWithRefresh = async (url, options) => {
	try {
	  return await request(url, options);
	} catch (err) {
	  if (err.message === "jwt expired") {
		const refreshData = await refreshToken(); //обновляем токен
		options.headers.authorization = refreshData.accessToken;
		return await request(url, options); //повторяем запрос
	  } else {
		return Promise.reject(err);
	  }
	}
  };