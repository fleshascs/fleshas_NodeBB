import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_FAILURE,
  GET_MY_DETAILS_REQUEST,
  LOGOUT_SUCCESS
} from 'areas/session/actions';

let user = {};
const initialState = user ? { loggedIn: false, user } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggingInFailed: false
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: !!action.user.uid,
        user: { ...action.user, ...action.user.user },
        loggingInFailed: false
      };
    case LOGIN_FAILURE:
    case AUTH_FAILURE:
      return {
        loggingInFailed: true
      };
    case GET_MY_DETAILS_REQUEST:
      const userData = { user: { ...state.user, ...action.user } };
      return {
        ...state,
        ...userData
      };
    case LOGOUT_SUCCESS:
      return {
        loggingInFailed: false
      };
    default:
      return state;
  }
}
