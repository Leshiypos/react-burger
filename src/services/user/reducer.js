import { SET_AUTH_CHECKED, SET_USER, ERROR_AUTH } from "./action";

const initialState = {
	user: null,
	isAuthChecked: false,
	error: null,
}

export const reducer = (state = initialState, action) => {
	switch (action.type){
		case SET_AUTH_CHECKED :
			return {
				...state,
				isAuthChecked: action.payload,
				error: null,
			}
		case SET_USER : 
		return {
			...state,
			user: action.payload,
			error: null,
		}
		case ERROR_AUTH:
			return {
				...state,
				error: action.payload,
			}
		default : 
		return state;
	}
}
