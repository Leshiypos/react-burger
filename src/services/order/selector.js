import { createSelector } from "reselect";

export const getResponseOrder = createSelector([
	store => store.order, 
	],
	(order) => ({
		loading : order.loading,
		error: order.error,
		responseOrder: order.response,
	})
	)