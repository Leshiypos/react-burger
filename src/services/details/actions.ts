export const SHOW_DETAILS = 'detaits/showDetails';
export const HIDE_DETAILS = 'detaits/hideDetails';

export const showDetails = (ingredient) => (dispatch) => {
	dispatch({
		type:SHOW_DETAILS,
		details: ingredient,
	})
}
export const hideDetails = () => (dispatch) => {
	dispatch({
		type:HIDE_DETAILS,
	})
}
