import { TOrdersProfileActions, WS_CONNECTION_CLOSED_PROFILE, WS_CONNECTION_ERROR_PROFILE, WS_CONNECTION_START_PROFILE, WS_CONNECTION_SUCCESS_PROFILE, WS_GET_MESSAGE_PROFILE } from "./actions";
import {WebsocketStatus} from '../../util/types';
import { IMessage } from "../feed-orders/actions";



interface IInitialState{
	wsConnected : string,
	messages: IMessage[],
	error?: Event;
}

const initialState:IInitialState = {
	wsConnected : WebsocketStatus.OFFLINE,
	messages: [],
}


export const reducer = (state=initialState, action: TOrdersProfileActions): IInitialState =>{
	switch (action.type){
		case WS_CONNECTION_START_PROFILE:
			return {
				...state,
				wsConnected: WebsocketStatus.CONNECTING,
			}
		case WS_CONNECTION_SUCCESS_PROFILE:
			return {
				...state,
				wsConnected: WebsocketStatus.ONLINE,
			}
		case WS_CONNECTION_ERROR_PROFILE: 
			return {
				...state,
				error: action.payload,
			}
		case WS_GET_MESSAGE_PROFILE:
			return {
				...state,
				messages: action.payload,
			}
		case WS_CONNECTION_CLOSED_PROFILE:
			return {
				...state,
				wsConnected: WebsocketStatus.OFFLINE,
			}
		default:
			return state;
	}
}