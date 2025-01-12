import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUNS, RESET_INGREDIENTS, SORT_INGREDIENTS } from "./actions";

const initialState = {
		bun: null,
		counter: {},
		counterBun: {},	
		ingredients: []
}

const sortIngredients = (mass, toIndex, fromIndex ) =>{
	const ingredients = [...mass];
	ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
	return ingredients;
}



export const reducer = (state = initialState, action) =>{
	switch (action.type){
		case ADD_INGREDIENT : 
			return {
				...state,
				ingredients: [...state.ingredients, action.ingredient],
				counter : {...state.counter, [action.ingredient._id] : state.counter[action.ingredient._id] ? ++state.counter[action.ingredient._id] : 1}
			
		} 
		case DELETE_INGREDIENT : 
			return {
				...state,
				ingredients: state.ingredients.filter(ingredient => ingredient.key !== action.element.key),
				counter: {...state.counter, [action.element._id]:--state.counter[action.element._id]}
			
		}
		case ADD_BUNS:
			return {
				...state,
				bun: action.bun,
				counterBun:  {[action.bun._id] : 2}
		}
		case SORT_INGREDIENTS :
		return {
			...state,
			ingredients : sortIngredients(state.ingredients, action.hoverIndex, action.dragIndex),
		}
		case RESET_INGREDIENTS:
			return initialState;
		default: 
			return state;
	}
}