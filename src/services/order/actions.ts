import { request } from "../../util/api";
import { AppThunk, IConstructorIngredient } from "../../util/types";
import { IMessage, IOrder } from "../feed-orders/actions";

export const SEND_ORDER: 'SEND_ORDER' = 'SEND_ORDER';
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SACCESS: 'SEND_ORDER_SACCESS' = 'SEND_ORDER_SACCESS';
export const HIDE_ORDER: 'HIDE_ORDER' = 'HIDE_ORDER';
export const GET_ORDER_SACCESS: 'GET_ORDER_SACCESS' = 'GET_ORDER_SACCESS';



interface IResponseOrderField{
	ingredients : IConstructorIngredient[];
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	price: number;
}
export interface IResponseOrderByNumber{
	success: boolean;
	orders: IOrder[];
}
export interface IResponseOrder{
	success: boolean;
	name?: string;
	order?:IResponseOrderField | IMessage;
}
interface ISendOrderAction{
	readonly type: typeof SEND_ORDER;
	
}
interface ISendOrderFailedAction{
	readonly type: typeof SEND_ORDER_FAILED;

}
interface ISendOrderSuccessAction{
	readonly type: typeof SEND_ORDER_SACCESS;
	readonly response: IResponseOrder;

}
interface IHideOrderAction{
	readonly type: typeof HIDE_ORDER;

}
interface IGetOrderAction{
	readonly type: typeof GET_ORDER_SACCESS;
	readonly response: IResponseOrderByNumber;
}
export type TOrderActions = 
	ISendOrderAction
	| ISendOrderFailedAction
	| ISendOrderSuccessAction
	| IHideOrderAction
	| IGetOrderAction;


export const hideOrder = (): AppThunk=> (dispatch) =>{
	dispatch({
		type: HIDE_ORDER,
	})
}
export const sendOrderAction = (req:{ingredients: string[]}): AppThunk => (dispatch) => {
	dispatch({type : SEND_ORDER});
	request<IResponseOrder>('/orders', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: (localStorage as {getItem: (el: string)=>string}).getItem('accessToken')
		},
		body: JSON.stringify(req)
	})
		.then(response=>{
			dispatch({
				type:SEND_ORDER_SACCESS,
				response: response,
			});
		})
		.catch(()=>{
			dispatch({
				type : SEND_ORDER_FAILED
			});
		})
}
export const getOrderAction = (number:number): AppThunk => (dispatch) => {
	dispatch({type : SEND_ORDER});
	request<IResponseOrderByNumber>(`/orders/${number}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	})
		.then(response=>{
			dispatch({
				type:GET_ORDER_SACCESS,
				response: response,
			});
		})
		.catch(()=>{
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