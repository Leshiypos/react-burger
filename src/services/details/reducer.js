import { HIDE_DETAILS, SHOW_DETAILS } from "./actions"

const initialState = {
	details : null
}

export const reducer = (state=initialState, action) => {
	switch (action.type){
		case SHOW_DETAILS:
			return {
				...state,
				details: action.details,
			};
		case HIDE_DETAILS : 
			return {
				...state,
				details: null,
			}
		default:
			return state;
	}
}