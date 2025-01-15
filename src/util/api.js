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