import { createSelector } from "reselect";

export const getDetails = createSelector([
	state=> state.details,
],
	(state)=>({
		details: state.details,
})
	)