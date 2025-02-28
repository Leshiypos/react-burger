import { createStore, applyMiddleware, combineReducers  } from "redux";
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as constructorReducer } from "./burger-constructor/reducer";
import { reducer as detailsReducer } from "./details/reducer";
import { reducer as userReducer } from "./user/reducer";
import { thunk } from "redux-thunk";
import { reducer as orderReducer } from "./order/reducer";

const rootReducer = combineReducers({
	ingredients : ingredientsReducer,
	selectIngredients: constructorReducer,
	details: detailsReducer,
	order: orderReducer,
	user: userReducer,
});


export function configureStore(initialState={}){
	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk)),
	);
	return store;
}