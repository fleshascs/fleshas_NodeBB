export const LOGOUT = 'areas/session/logout';
export const LOGIN = 'areas/session/login';
export const REGISTER = 'areas/session/register';
export const RESET_PASSWORD = 'areas/session/reset_password';
export const REGISTER_COMPLETE = 'areas/session/register_complete';
export const REGISTER_ABORT = 'areas/session/register_abort';
export const LOGOUT_SUCCESS = 'USERS_LOGOUT';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const GET_MY_DETAILS_REQUEST = 'USER_GET_MY_DETAILS_REQUEST';
export const RESET_PASSWORD_COMMIT = 'areas/session/reset_password/commit';

export function logout() {
  return {
    type: LOGOUT
  };
}
export function removeSessionData() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password
  };
}

export function register(values) {
  return {
    type: REGISTER,
    values
  };
}

export function resetPassword(email) {
  return {
    type: RESET_PASSWORD,
    email
  };
}

export function resetPasswordCommit(password, code) {
  return {
    type: RESET_PASSWORD_COMMIT,
    password,
    code
  };
}

export function registerComplete() {
  return {
    type: REGISTER_COMPLETE
  };
}

export function registerAbort() {
  return {
    type: REGISTER_ABORT
  };
}
