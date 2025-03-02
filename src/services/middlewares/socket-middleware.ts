import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch,RootState, TApplicationActions} from '../../util/types'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../feed-orders/actions';

export const socketMiddleware = ():Middleware => {
	return ((store :MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		return (next) => (action : TApplicationActions)=>{
			const {dispatch} = store;
			const {type, payload} = action;

			if (type === WS_CONNECTION_START){
				socket = new WebSocket(payload);
			}

			if (socket){
				socket.onopen = () => {
					dispatch({type : WS_CONNECTION_SUCCESS})
				}

				socket.onerror = event => {
					dispatch({type: WS_CONNECTION_ERROR, payload: event});
				}

				socket.onmessage = event => {
					const {data} = event;
					dispatch({type: WS_GET_MESSAGE, payload: data})
				}
				socket.onclose = () => {
					dispatch({type: WS_CONNECTION_CLOSED})
				}
			}
			next(action);
		}
	}) as Middleware;
}
