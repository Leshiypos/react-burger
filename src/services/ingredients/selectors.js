import { createSelector } from "reselect";

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
	buns : state.ingredients.filter((ingr) => ingr.type == "bun"),
	mains : state.ingredients.filter((ingr) => ingr.type == "main"),
	sauces : state.ingredients.filter((ingr) => ingr.type == "sauce"),
})
)