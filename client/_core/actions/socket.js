export const SET_STATUS = 'socket/set_status';
export const CONNECTED = 'socket/connected';
export const RECONNECTING = 'socket/reconnecting';
export const RECONNECTION_FAILED = 'socket/reconnect_failed';

export function setConnectionStatus(status) {
	return {
		type: SET_STATUS,
		status,
	};
}

export function setConnectionConnected() {
	return setConnectionStatus(CONNECTED);
}

export function setConnectionRecconecting() {
	return setConnectionStatus(RECONNECTING);
}

export function setConnectionFailed() {
	return setConnectionStatus(RECONNECTION_FAILED);
}
