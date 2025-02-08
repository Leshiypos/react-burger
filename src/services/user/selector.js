import { createSelector } from "reselect";



export const getUser = createSelector([
	store => store.user,
],
	(user)=>({
		isAuthChecked : user.isAuthChecked,
		user : user.user,

})
)