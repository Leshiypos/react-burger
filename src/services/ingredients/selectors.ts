import { createSelector } from "reselect";
import { IConstructorIngredient } from "../../util/types";

//Memoизированный селектор
export const getIngredientsState = createSelector([
	(state) => state.ingredients,
],
(state) => ({
	ingredients : state.ingredients,
	error: state.error,
	loading: state.loading
})
)
//Разделен по категориям
export const getIngredientsByBategories = createSelector([
	(state) => state.ingredients,
],
(state) => ({
	ingredientsSortByCategory: {
		buns : state.ingredients.filter((ingr:IConstructorIngredient) => ingr.type == "bun"),
		mains : state.ingredients.filter((ingr:IConstructorIngredient) => ingr.type == "main"),
		sauces : state.ingredients.filter((ingr:IConstructorIngredient) => ingr.type == "sauce"),
	},
})
)