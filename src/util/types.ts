import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from "redux";
import { TConstructorActions } from "../services/burger-constructor/actions";
import { store } from '../main';
import { TIngredientsActions } from '../services/ingredients/actions';
import { TDetailsActions } from '../services/details/actions';
import { TOrderActions } from '../services/order/actions';
import { TUserActions } from '../services/user/action';

export interface IUseForm {
	name: string ,
    email: string,
    password: string,
}

export interface IConstructorIngredient{
_id:string,
name:string,
type:string,
proteins:number,
fat:number,
carbohydrates:number,
calories:number,
price:number,
image:string,
image_mobile:string,
image_large:string,
__v:number,
}

export type IConstructorIngredientWithKey = IConstructorIngredient & {key:string};


// Типизация хранилища

export type TApplicationActions = 
	TConstructorActions
	|TIngredientsActions
	|TDetailsActions
	|TOrderActions
	|TUserActions;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;