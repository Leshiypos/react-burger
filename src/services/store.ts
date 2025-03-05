import { createStore, applyMiddleware, combineReducers  } from "redux";
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as constructorReducer } from "./burger-constructor/reducer";
import { reducer as detailsReducer } from "./details/reducer";
import { reducer as userReducer } from "./user/reducer";
import { thunk } from "redux-thunk";
import { reducer as orderReducer } from "./order/reducer";
import { reducer as feedOrdersReducer } from "./feed-orders/reducer";
import {socketMiddleware} from './middlewares/socket-middleware'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, onClose, onError, onMessage, onOpen, wsConnect } from './feed-orders/actions';

const socketMiddlewareFeed = socketMiddleware({
	connect : WS_CONNECTION_START,
	disconect: WS_CONNECTION_CLOSED,
	onConnecting: wsConnect,
	onClose: onClose,
	onError : onError,
	onMessage: onMessage,
	onOpen: onOpen
});

const rootReducer = combineReducers({
	ingredients : ingredientsReducer,
	selectIngredients: constructorReducer,
	details: detailsReducer,
	order: orderReducer,
	user: userReducer,
	feedOrders : feedOrdersReducer,
});


export function configureStore(initialState={}){
	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk,socketMiddlewareFeed)),
	);
	return store;
}