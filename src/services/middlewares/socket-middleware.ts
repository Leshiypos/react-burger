import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch,RootState, TApplicationActions} from '../../util/types'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, onClose, onError, onMessage, onOpen, wsConnect } from '../feed-orders/actions';
import {refreshToken} from '../../util/api'
import { WS_CONNECTION_CLOSED_PROFILE, WS_CONNECTION_START_PROFILE, onCloseProfile, onErrorProfile, onMessageProfile, onOpenProfile, wsConnectProfile } from '../profile-orders/actions';

interface IWsAction{
		connect: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START_PROFILE,
		disconect: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED_PROFILE,
		onConnecting : typeof wsConnect | typeof wsConnectProfile,
		onClose: typeof onClose | typeof onCloseProfile,
		onError: typeof onError | typeof onErrorProfile,
		onMessage: typeof onMessage | typeof onMessageProfile,
		onOpen: typeof onOpen | typeof onOpenProfile
}
const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (wsAction:IWsAction, withTokenRefresh: boolean = false):Middleware => {
	return ((store :MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		return (next) => (action : TApplicationActions)=>{
			const {connect, disconect, onConnecting, onClose, onError, onMessage, onOpen} = wsAction;
			const {dispatch} = store;
			const {type} = action;
			let isConnected = false;
			let wsUrl = "";
			let reconnectTimer = 0;
			
			if (connect === type){
				wsUrl = action.payload;
				socket = new WebSocket(wsUrl);
				isConnected = true;
			}

			if (socket){
				socket.onopen = () => {
					dispatch(onOpen())
				}

				socket.onerror = event => {
					dispatch(onError(event));
				}

				socket.onmessage = event => {
					const {data} = event;
					try{
						const parseData = JSON.parse(data);
						if (withTokenRefresh && parseData.message === "Invalid or missing token"){
							refreshToken()
                               .then(refreshData => {
                                  const wssUrl = new URL(wsUrl);
                                  wssUrl.searchParams.set(
                                    "token",
                                    refreshData.accessToken.replace("Bearer ", "")
                                  );
                                  dispatch(onConnecting(wssUrl.toString()));
                               })
                               .catch((event) => {
                                 dispatch(onError((event)));
                               });
                            dispatch(onClose());
                            return;
						}
						dispatch(onMessage(parseData))
					} catch (err) {
                        dispatch(onError((event)));
                    }
				}
				socket.onclose = () => {
					dispatch(onClose());
					if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(onConnecting(wsUrl));
                        }, RECONNECT_PERIOD);
                    }
				}
			}
			if (socket && disconect === type) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }
			next(action);
		}
	}) as Middleware;
}
