import { createSelector } from "reselect";


export const getOrdersProfileState = createSelector([
	(state) => state.ordersProfile,
],
	(state) => ({
		wsConnectedProfile : state.wsConnected,
		ordersProfile: state.messages.orders,
		totalProfile: state.messages.total,
		totalTodayProfile: state.messages.totalToday,
	})
	)