import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED} from "./actions";

const initialState ={
	ingredients: [],
	loading: false,
    error: false,
}

export const reducer = (state = initialState, action)=>{
	switch (action.type){
		case GET_INGREDIENTS: 
			return {
				...state,
				loading: true,
				error: false,
			};
		case GET_INGREDIENTS_SUCCESS :
			return {
				...state,
				ingredients: action.ingredients,
				loading: false,
			}
		case GET_INGREDIENTS_FAILED :
			return {
				...state,
				loading: false,
				error: true,
			}
		default :{
			return state;
		}
	}
}