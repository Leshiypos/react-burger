import { createSelector } from "reselect";

export const getResponseOrder = createSelector([
	store => store.order, 
	],
	(order) => ({
		showOrder : order.showOrder,
		loading : order.loading,
		error: order.error,
		responseOrder: order.response,
		
	})
	)