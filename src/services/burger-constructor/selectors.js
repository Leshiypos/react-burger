import { createSelector } from "reselect";

export const getBurgerConsctructorIngredients = createSelector([
	(store) => store.selectIngredients,
],
(store) =>({
	ingredients: store.ingredients,
	bun: store.bun,
	total: store.ingredients.reduce((sum, elem)=>sum+elem.price, 0) + (store.bun ? (store.bun.price*2) : 0)
})
)