import { request } from "../../util/api";
import { AppThunk, IConstructorIngredient } from "../../util/types";

export const GET_INGREDIENTS : 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

export interface IGetIngredientsAction{
	readonly type : typeof GET_INGREDIENTS;
}
export interface IGetIngredientsFailedAction{
	readonly type : typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccessAction{
	readonly type : typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: IConstructorIngredient[];
}

export type TIngredientsActions = 
	IGetIngredientsAction
	|IGetIngredientsFailedAction
	|IGetIngredientsSuccessAction;



export const getIngredientsAction = ():AppThunk => (dispatch) => {
	dispatch({type : GET_INGREDIENTS});
	request<{data: IConstructorIngredient[]}>('/ingredients')
		.then(response => {
			dispatch({
				type : GET_INGREDIENTS_SUCCESS,
				ingredients: response.data,
			  });
		})
		.catch(()=>{
			dispatch({type: GET_INGREDIENTS_FAILED});
		});	
}