import { TrefreshData } from "../../pages/profile-form";
import { IOptionsFetch, fetchWithRefresh, request } from "../../util/api";
import { AppThunk } from "../../util/types";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';

export interface IUserCurrent{
	readonly email : string;
	readonly name: string;
}

interface ISetAuthCheckedAction{
	readonly type: typeof SET_AUTH_CHECKED;
	readonly payload: boolean
}

interface ISetUserAction{
	readonly type:  typeof SET_USER;
	readonly payload: IUserCurrent | null;
}

export type TUserActions = 
	ISetAuthCheckedAction
	| ISetUserAction;

	interface IRegisterValue extends IUserCurrent{
		password: string, 
}

export interface IRegister{
    success: true,
    user:IUserCurrent ,
    accessToken: string,
    refreshToken: string
}

export const setAuthChecked = (value:boolean): ISetAuthCheckedAction => ({
	type: SET_AUTH_CHECKED,
	payload: value,
});

export const setUser = (user:IUserCurrent | null ) : ISetUserAction => ({
	type: SET_USER,
	payload: user,
})

const getUser = async (url: string, options: IOptionsFetch)=>{
	const result = await fetchWithRefresh(url, options);

	try {
		return await result;
	} catch (error){
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		throw error;
	}
}


export const register = (value:IRegisterValue, cb:(f:boolean | null)=>void): AppThunk => (dispatch) => {
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



interface ILoginResponse{
	success: boolean,
	accessToken: string,
	refreshToken: string,
	user: IUserCurrent;
  }

export const login = (mail :string, pass:string, cb: (a:boolean)=>void): AppThunk => (dispatch) => {
	  	request<ILoginResponse>('/auth/login',{
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

	export const logout = (): AppThunk => (dispatch) => {
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

export const checkUserAuth = (): AppThunk => (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser('/auth/user', {
				method: "GET",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					authorization: (localStorage as {getItem: (el:string)=> string}).getItem('accessToken')
				  },
			})
              .then(response =>{ 
				dispatch(setUser(response.user))})
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
};


export const refreshUserData = (refreshData: TrefreshData): AppThunk => (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            getUser('/auth/user', {
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					authorization: (localStorage as {getItem: (a:string) => string}).getItem('accessToken')
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

interface IForgotPasswordResponse{
	success: boolean;
	message: string;
}

export const forgotPassword = (mail : string, cb: (a:boolean)=>void): AppThunk => (dispatch) =>{
	request<IForgotPasswordResponse>('/password-reset',{
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

export const resetPassword = (pass:string, token:string, cb: (a:boolean)=>void): AppThunk => (dispatch) => {
	request<IForgotPasswordResponse>('/password-reset/reset', {
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


