import { AppThunk, IConstructorIngredient } from "../../util/types";

export const SHOW_DETAILS: 'SHOW_DETAILS' = 'SHOW_DETAILS';
export const HIDE_DETAILS: 'HIDE_DETAILS' = 'HIDE_DETAILS';

export interface IShowDetailsAction{
	readonly type: typeof SHOW_DETAILS;
	readonly details: IConstructorIngredient;
}

export interface IHideDetailsAction{
	readonly type : typeof HIDE_DETAILS;
}

export type TDetailsActions = 
	IShowDetailsAction
	| IHideDetailsAction;


export const showDetails = (ingredient:IConstructorIngredient):AppThunk => (dispatch) => {
	dispatch({
		type:SHOW_DETAILS,
		details: ingredient,
	})
}
export const hideDetails = ():AppThunk => (dispatch) => {
	dispatch({
		type:HIDE_DETAILS,
	})
}
