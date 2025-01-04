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