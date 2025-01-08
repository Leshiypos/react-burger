import { v4 as uuidv4 } from "uuid";
export const ADD_INGREDIENT = 'constructor/addIngredient';
export const DELETE_INGREDIENT = 'constructor/deleteIngredient';
export const ADD_BUNS = 'constructor/addBuns';
export const RESET_INGREDIENTS = 'constructor/resetIngredients';


export const addIngredient = (ingredient)=>(dispatch)=>{
	const key = uuidv4();
	console.log("Перетащил", key);
	dispatch({
	  type: ADD_INGREDIENT,
	  ingredient: { ...ingredient, key },
	});
}

export const deleteIngredient = (elem) => (dispatch) => {
	console.log(elem.key)
	dispatch({
		type: DELETE_INGREDIENT,
		element: elem,
	})
}


export const addBuns = (ingredient)=>(dispatch)=>{
	console.log("Перетащил булку", ingredient);
	dispatch({
	  type: ADD_BUNS,
	  bun: ingredient,
	});
}