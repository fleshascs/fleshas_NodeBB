export const UPDATE_USER_DATA = 'areas/user/update_user_data';
export const UPDATE_USER_EMAIL = 'areas/user/update_user_email';
export const UPDATE_USER_PASSWORD = 'areas/user/update_user_password';
export const UPDATE_USER_PICTURE = 'areas/user/update_user_picture';
export const UPDATE_USER_COVER_IMAGE = 'areas/user/update_user_cover_image';
export const ADD_USER_TO_ONLINE_LIST = 'areas/user/add_user_to_online_list';
export const REMOVE_USER_FROM_ONLINE_LIST =
	'areas/user/remove_user_from_online_list';
export const SET_ONLINE_USERS = 'users/onlineUsers';

export function updateUserData(request) {
	return {
		type: UPDATE_USER_DATA,
		request,
	};
}

export function updateUserEmail(request) {
	return {
		type: UPDATE_USER_EMAIL,
		request,
	};
}

export function updateUserPassword(request) {
	return {
		type: UPDATE_USER_PASSWORD,
		request,
	};
}

export function updateUserPicture(request) {
	return {
		type: UPDATE_USER_PICTURE,
		request,
	};
}

export function updateUserCoverImage(request) {
	return {
		type: UPDATE_USER_COVER_IMAGE,
		request,
	};
}

export const setOnlineUsers = function(users) {
	const fixedData = users.reduce((ob, u) => {
		ob[u.uid] = u;
		return ob;
	}, {});

	return setOnlineUsersPure(fixedData);
};

export const setOnlineUsersPure = function(users) {
	return { type: SET_ONLINE_USERS, users };
};

export function addToOnlineList(user) {
	return {
		type: ADD_USER_TO_ONLINE_LIST,
		user,
	};
}

export function removeFromOnlineList(user) {
	return {
		type: REMOVE_USER_FROM_ONLINE_LIST,
		user,
	};
}
