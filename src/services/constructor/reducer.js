import { ADD_INGREDIENT, DELETE_INGREDIENT } from "./actions";

const initialState = {
	selectIngredients: [],

}

export const reducer = (state = initialState, action) =>{
	switch (action.type){
		case ADD_INGREDIENT : {
			return {
				...state,
				selectIngredients: [...state.selectIngredients, action.selectIngredients]
			}
		} 
		case DELETE_INGREDIENT : {
			return {
				...state,
				selectIngredients: [state.selectIngredients.filter(ingredient => ingredient.key !== action.key)]
			}
		}
		default: {
			return state
		}
	}
}