export const SET_CSRF = 'csrf/setcsrf';

export const setCSRF = function(csrf) {
	return { type: SET_CSRF, csrf };
};
