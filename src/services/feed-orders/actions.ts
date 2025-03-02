export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';

interface IOrders		  {
	ingredients: string[],
	_id: string,
	status: string,
	number: number,
	createdAt: string,
	updatedAt: string
  }
export interface IMessage{
	success: boolean;
	orders: IOrders[],
	total: number,
	totalToday: number;
	} 

interface IWsConnectionStartAction{
	readonly type: typeof WS_CONNECTION_START;
	readonly payload: string,
}

interface IWsConnctionSuccesAction{
	readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionErrorAction{
	readonly type: typeof  WS_CONNECTION_ERROR;
	readonly payload: Event;
}

interface IWsGetMessageAction{
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: IMessage[];
}

interface IWsConnectionCloseAction{
	readonly type : typeof WS_CONNECTION_CLOSED;
}

export type TFeedOrdersActions = 
	IWsConnectionStartAction
	| IWsConnctionSuccesAction
	| IWsConnectionErrorAction
	| IWsGetMessageAction
	| IWsConnectionCloseAction;

