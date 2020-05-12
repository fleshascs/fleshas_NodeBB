import { SET_STATUS, CONNECTED } from '../actions/socket';

const initialState = { status: CONNECTED };
export default function users(state = initialState, action) {
	switch (action.type) {
		case SET_STATUS:
			return {
				status: action.status,
			};
		default:
			return state;
	}
}
