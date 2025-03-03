import { createSelector } from "reselect";


export const getFeedOrdersState = createSelector([
	(state) => state.feedOrders,
],
	(state) => ({
		wsConnected : state.wsConnected,
		feedOrders: state.messages.orders,
		total: state.messages.total,
		totalToday: state.messages.totalToday,
	})
	)