import { createSelector } from "reselect";
import { IConstructorIngredient } from "../../util/types";

export const getBurgerConsctructorIngredients = createSelector([
	(store) => store.selectIngredients,
],
(store) =>({
	ingredients: store.ingredients,
	bun: store.bun,
	total: store.ingredients.reduce((sum:number, elem:IConstructorIngredient)=>sum+elem.price, 0) + (store.bun ? (store.bun.price*2) : 0),
	request : {ingredients : [store.bun ? store.bun._id : 0 ,...store.ingredients.reduce((mass:IConstructorIngredient[], elem:IConstructorIngredient)=> [...mass, elem._id],[]) ,store.bun ? store.bun._id : 0]}
})
)