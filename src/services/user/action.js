import { request } from "../../util/api";

export const SET_AUTH_CHECKED = 'user/setAuthChecked';
export const SET_USER = 'user/setUser';
export const ERROR_AUTH = 'user/errorAuth';


export const setAuthChecked = (value) => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
})
export const errorAuth = (error) => ({
	type: ERROR_AUTH,
	payload: error,
})

const getUser = async ()=>{
	const result = await request('/auth/user', {
		method: "GET",
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken')
		  },
	});

	try {
		return await result;
	} catch (error){
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		throw error;
	}
}


export const register = (value) => (dispatch) => {
	request('/auth/register',{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(value)
	} ).then((response)=>{
		dispatch(setUser(response));
		dispatch(setAuthChecked(true))
		localStorage.setItem('accessToken',response.accessToken );
		localStorage.setItem('refreshToken',response.refreshToken );

	}).catch(error=>{
		dispatch(errorAuth(error));
	})
}

export const login = (mail, pass) => (dispatch) => {
	  	request('/auth/login',{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"email" : mail,
				"password" : pass
			})
		}).then(response => {
		localStorage.setItem('accessToken',response.accessToken );
		localStorage.setItem('refreshToken',response.refreshToken );
		dispatch(setUser(response.user));
		dispatch(setAuthChecked(true));
		}).catch(error=>{
			dispatch(errorAuth(error));
		})
	};

	export const logout = () => (dispatch) => {
		  request('/auth/logout',{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"token" : localStorage.getItem('refreshToken')
			})
		  }).then(() => {
			dispatch(setUser(null));
		  });
		};

export const checkUserAuth = () => (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser()
              .then(response =>{ 
				dispatch(setUser(response.user))})
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
};

export const forgotPassword = (mail, cb) => (dispatch) =>{
	request('/password-reset',{
		method : "POST",
		headers : {
			"Content-Type": "application/json",
		},
		body : JSON.stringify({"email" : mail })
	})
	.then(response => {if (response.success) {
		console.log(`На почту ${mail} отправлено письмо с инструкцией`);
		cb(true);
		} else (console.log(`Ошибка востановления пароля`))
	})
	.catch(error => console.log(error))
}

export const resetPassword = (pass, token, cb) => (dispatch) => {
	request('/password-reset/reset', {
		method : "POST",
		headers : {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"password" : pass,
			"token" : token
		})
	})
	.then(response => {if(response.success) {
		console.log("Пароль успешно восcтановлен");
		cb(true);
		}
	})
	.catch(error => console.log(error))
}