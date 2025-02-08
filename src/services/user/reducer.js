import { SET_AUTH_CHECKED, SET_USER } from "./action";

const initialState = {
	user: null,
	isAuthChecked: false,
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
		default : 
		return state;
	}
}
