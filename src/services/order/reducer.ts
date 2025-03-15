import { GET_ORDER_SACCESS, HIDE_ORDER, IResponseOrder, IResponseOrderByNumber, SEND_ORDER, SEND_ORDER_FAILED, SEND_ORDER_SACCESS, TOrderActions } from "./actions";

interface IInitialState{
	loading: boolean;
	error: boolean;
	response : IResponseOrder | null;
	responseProfile : IResponseOrderByNumber | null;
}

const initialState: IInitialState = {
	loading: false,
	error: false,
	response: null,
	responseProfile: null
}

export const reducer = (state=initialState, action:TOrderActions):IInitialState=>{
	switch (action.type){
		case SEND_ORDER:
			return {
				...state,
				loading:true,
				error: false,
			}
		case SEND_ORDER_SACCESS:
			return {
				...state,
				response: action.response,
				loading: false,
			}
		case GET_ORDER_SACCESS:
			return {
				...state,
				responseProfile: action.response,
				loading: false,
			}
		case SEND_ORDER_FAILED: 
		return {
			...state,
			loading:false,
			error: true,
		}
		case HIDE_ORDER:
			return initialState;
		default:
			return state;
	}
}