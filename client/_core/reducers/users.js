import { SET_ONLINE_USERS } from 'areas/user/actions';

const initialState = { users: {} };
export default function users(state = initialState, action) {
	switch (action.type) {
		case SET_ONLINE_USERS:
			return {
				users: action.users,
			};
		default:
			return state;
	}
}
