import { createSelector } from "reselect";



export const getUser = createSelector([
	store => store.user,
],
	(user)=>({
		error : user.error,
		isAuthChecked : user.isAuthChecked,
		user : user.user,

})
)