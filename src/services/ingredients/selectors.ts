import { createSelector } from "reselect";
import { IConstructorIngredient } from "../../util/types";


interface IIngredientWithKeyIdElem{
	name: string,
	price: number,
	image_mobile: string,
	image_large: string,
	image: string,
}
interface ingredientsWithIdKey{
	[index: string] : IIngredientWithKeyIdElem
}

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
	ingredientsWithIdKey : state.ingredients.reduce((obj:ingredientsWithIdKey,{_id,name, price, image_mobile,image_large, image} : IIngredientWithKeyIdElem &{_id: string} )=>{
		obj[_id]={name, price, image_mobile,image_large, image};
		return obj;
	},{})
})
)