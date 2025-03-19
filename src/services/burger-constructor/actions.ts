import { v4 as uuidv4 } from "uuid";
import {
  AppThunk,
  IConstructorIngredient,
  IConstructorIngredientWithKey,
} from "../../util/types";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const ADD_BUNS: "ADD_BUNS" = "ADD_BUNS";
export const RESET_INGREDIENTS: "RESET_INGREDIENTS" = "RESET_INGREDIENTS";
export const SORT_INGREDIENTS: "SORT_INGREDIENTS" = "SORT_INGREDIENTS";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IConstructorIngredientWithKey;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly element: IConstructorIngredientWithKey;
}
export interface IAddBunsAction {
  readonly type: typeof ADD_BUNS;
  readonly bun: IConstructorIngredient;
}
export interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}
export interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TConstructorActions =
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IAddBunsAction
  | IResetIngredientsAction
  | ISortIngredientsAction;

export const addIngredient =
  (ingredient: IConstructorIngredient): AppThunk =>
  (dispatch) => {
    const key = uuidv4();
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: { ...ingredient, key },
    });
  };

export const deleteIngredient =
  (elem: IConstructorIngredientWithKey): AppThunk =>
  (dispatch) => {
    dispatch({
      type: DELETE_INGREDIENT,
      element: elem,
    });
  };

export const addBuns =
  (ingredient: IConstructorIngredient): AppThunk =>
  (dispatch) => {
    dispatch({
      type: ADD_BUNS,
      bun: ingredient,
    });
  };

export const sortIngredients =
  (dragIndex: number, hoverIndex: number): AppThunk =>
  (dispatch) => {
    dispatch({
      type: SORT_INGREDIENTS,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };
export const resetIngredients = (): AppThunk => (dispatch) => {
  dispatch({
    type: RESET_INGREDIENTS,
  });
};
