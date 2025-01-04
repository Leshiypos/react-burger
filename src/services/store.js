import { createStore, applyMiddleware, combineReducers  } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as constructorReducer } from "./constructor/reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
	ingredients : ingredientsReducer,
	constructor: constructorReducer
});


export function configureStore(initialState){
	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk)),
	);
	return store;
}