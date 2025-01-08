import { sendOrder } from "../../util/api";

export const SEND_ORDER = 'order/sendOrder';
export const SEND_ORDER_FAILED = 'order/failed';
export const SEND_ORDER_SACCESS = 'order/saccess';
export const HIDE_ORDER = 'order/hideOrder';



export const sendOrderAction = (request) => (dispatch) => {
	dispatch({type : SEND_ORDER});
	sendOrder(request)
		.then(response=>{
			dispatch({
				type:SEND_ORDER_SACCESS,
				response: response,
			});
		})
		.catch(error=>{
			dispatch({
				type : SEND_ORDER_FAILED
			});
		})
}






// export const getIngredientsAction = () => (dispatch) => {
// 	dispatch({type : GET_INGREDIENTS});
// 	getIngredients()
// 		.then(response => {
// 			dispatch({
// 				type : GET_INGREDIENTS_SUCCESS,
// 				ingredients: response.data,
// 			  });
// 		})
// 		.catch((error)=>{
// 			dispatch({type: GET_INGREDIENTS_FAILED});
// 		});	
// }