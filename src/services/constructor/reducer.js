import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUNS } from "./actions";

const initialState = {
		bun: null,	
		ingredients: []
}

export const reducer = (state = initialState, action) =>{
	switch (action.type){
		case ADD_INGREDIENT : 
			return {
				...state,
				ingredients: state.ingredients ? [...state.ingredients, action.ingredient] : [action.ingredient]
			
		} 
		case DELETE_INGREDIENT : 
			return {
				...state,
				ingredients: [...state.ingredients].filter(ingredient => ingredient.key !== action.key)
			
		}
		case ADD_BUNS:
			return {
				...state,
				bun: action.bun,
			
		}
		default: {
			return state
		}
	}
}