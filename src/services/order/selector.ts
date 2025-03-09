import { createSelector } from "reselect";

export const getResponseOrder = createSelector([
	store => store.order, 
	],
	(order) => ({
		showOrder : order.showOrder,
		loading : order.loading,
		error: order.error,
		responseOrder: order.response,
		orderState: order.response?.orders ? order.response?.orders[0]:null,
		
	})
	)