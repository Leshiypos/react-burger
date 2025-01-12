import { HIDE_ORDER, SEND_ORDER, SEND_ORDER_FAILED, SEND_ORDER_SACCESS } from "./actions";

const initialState = {
	loading: false,
	error: false,
	response: null,
	showOrder: false,
}

export const reducer = (state=initialState, action)=>{
	switch (action.type){
		case SEND_ORDER:
			return {
				...state,
				showOrder:true,
				loading:true,
				error: false,
			}
		case SEND_ORDER_SACCESS:
			return {
				...state,
				response: action.response,
				loading: false,
			}
		case SEND_ORDER_FAILED: 
		return {
			...state,
			loading:false,
			error: true,
		}
		case HIDE_ORDER:
			return {
				initialState
			}
		default:
			return state;
	}
}