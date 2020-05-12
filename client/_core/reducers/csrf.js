import * as actions from '../actions/csrf';

const initialState = { csrf: '' };
export default function csrf(state = initialState, action) {
	switch (action.type) {
		case actions.SET_CSRF:
			return {
				csrf: action.csrf,
			};
		default:
			return state;
	}
}
