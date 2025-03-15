import {IMessage} from '../feed-orders/actions'

export const WS_CONNECTION_START_PROFILE: 'WS_CONNECTION_START_PROFILE' = 'WS_CONNECTION_START_PROFILE';
export const WS_CONNECTION_SUCCESS_PROFILE: 'WS_CONNECTION_SUCCESS_PROFILE' = 'WS_CONNECTION_SUCCESS_PROFILE';
export const WS_CONNECTION_ERROR_PROFILE: 'WS_CONNECTION_ERROR_PROFILE' = 'WS_CONNECTION_ERROR_PROFILE';
export const WS_GET_MESSAGE_PROFILE: 'WS_GET_MESSAGE_PROFILE' = 'WS_GET_MESSAGE_PROFILE';
export const WS_CONNECTION_CLOSED_PROFILE: 'WS_CONNECTION_CLOSED_PROFILE' = 'WS_CONNECTION_CLOSED_PROFILE';


interface IWsConnectionStartProfileAction{
	readonly type: typeof WS_CONNECTION_START_PROFILE;
	readonly payload: string,
}

interface IWsConnctionSuccesProfileAction{
	readonly type: typeof WS_CONNECTION_SUCCESS_PROFILE;
}

interface IWsConnectionErrorProfileAction{
	readonly type: typeof  WS_CONNECTION_ERROR_PROFILE;
	readonly payload: Event;
}

interface IWsGetMessageProfileAction{
	readonly type: typeof WS_GET_MESSAGE_PROFILE;
	readonly payload: IMessage[];
}

interface IWsConnectionCloseProfileAction{
	readonly type : typeof WS_CONNECTION_CLOSED_PROFILE;
}

export type TOrdersProfileActions = 
	IWsConnectionStartProfileAction
	| IWsConnctionSuccesProfileAction
	| IWsConnectionErrorProfileAction
	| IWsGetMessageProfileAction
	| IWsConnectionCloseProfileAction;


export const wsConnectProfile = (url:string):IWsConnectionStartProfileAction =>({
	type: WS_CONNECTION_START_PROFILE,
	payload: url,
})

export const onOpenProfile = ():IWsConnctionSuccesProfileAction=>({
	type : WS_CONNECTION_SUCCESS_PROFILE
})

export const onErrorProfile = (event: Event):IWsConnectionErrorProfileAction =>({
	type: WS_CONNECTION_ERROR_PROFILE, payload: event
})

export const onMessageProfile = (parseData : IMessage[]):IWsGetMessageProfileAction => ({
	type: WS_GET_MESSAGE_PROFILE, payload: parseData
}) 

export const onCloseProfile = (): IWsConnectionCloseProfileAction=>({
	type: WS_CONNECTION_CLOSED_PROFILE
})