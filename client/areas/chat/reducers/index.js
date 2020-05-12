import * as actions from '../actions';

const initialState = { chatsOpened: {}, unreadCount: 0 };
export default function chat(state = initialState, action) {
	switch (action.type) {
		case actions.CHATS_OPENED: {
			const chats = { ...state, chatsOpened: action.chatsOpened };
			// const length = Object.keys(chats.chatsOpened).length;
			// if (length > 4) {
			// 	delete chats.chatsOpened[Object.keys(chats.chatsOpened)[0]];
			// }
			return chats;
			//return { ...state, chatsOpened: action.chatsOpened };
		}
		case actions.UPDATE_UNREAD_COUNT: {
			let unreadCount = action.count;
			return { ...state, unreadCount };
		}
		default:
			return state;
	}
}
