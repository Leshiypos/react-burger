import { fetchWithRefresh, request } from "../../util/api";

export const SET_AUTH_CHECKED = 'user/setAuthChecked';
export const SET_USER = 'user/setUser';


export const setAuthChecked = (value) => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
})

const getUser = async (url, options)=>{
	const result = await fetchWithRefresh(url, options);

	try {
		return await result;
	} catch (error){
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		throw error;
	}
}

interface IRegisterValue{
		email: string, 
		password: string, 
		name: string 
}

interface IUser{
	email: string,
	name: string
}

interface IRegister{
    success: true,
    user:IUser ,
    accessToken: string,
    refreshToken: string
}
export const register = (value:IRegisterValue, cb:(f:string)=>void) => (dispatch) => {
	request<IRegister>('/auth/register',{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(value)
	} ).then((response)=>{
		dispatch(setUser(response.user));
		dispatch(setAuthChecked(true))
		localStorage.setItem('accessToken',response.accessToken );
		localStorage.setItem('refreshToken',response.refreshToken );

	}).catch(error=>{
		cb(error.message);
	})
}

export const login = (mail, pass, cb = f=>f) => (dispatch) => {
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
			cb(error.message);
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
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		  });
		};

export const checkUserAuth = () => (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser('/auth/user', {
				method: "GET",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					authorization: localStorage.getItem('accessToken')
				  },
			})
              .then(response =>{ 
				dispatch(setUser(response.user))})
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
};


export const refreshUserData = (refreshData) => (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser('/auth/user', {
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					authorization: localStorage.getItem('accessToken')
				  },
				  body: JSON.stringify(refreshData),
			})
              .then(response =>{ 
				dispatch(setUser(response.user))})
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
};

export const forgotPassword = (mail, cb= f=>f) => (dispatch) =>{
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


