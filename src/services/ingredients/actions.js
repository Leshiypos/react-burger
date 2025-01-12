import { request } from "../../util/api";

export const GET_INGREDIENTS = 'ingredients/getIngredients';
export const GET_INGREDIENTS_FAILED = 'ingredients/failed';
export const GET_INGREDIENTS_SUCCESS = 'ingredients/success';



export const getIngredientsAction = () => (dispatch) => {
	dispatch({type : GET_INGREDIENTS});
	request('/ingredients')
		.then(response => {
			dispatch({
				type : GET_INGREDIENTS_SUCCESS,
				ingredients: response.data,
			  });
		})
		.catch((error)=>{
			dispatch({type: GET_INGREDIENTS_FAILED});
		});	
}