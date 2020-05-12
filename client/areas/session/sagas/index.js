import { takeEvery, select, call, takeLeading } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import Router from 'next/router';
import * as commonSelectors from 'areas/general/selectors';
import socket from 'areas/socket/services';
import * as actions from '../actions';
import { error, formUrlencoded, axiosHandler } from '_core/utils';
import { translate } from '_core/i18n';


export default [
  takeEvery(actions.LOGOUT, logout),
  takeLeading(actions.LOGIN, login),
  takeLeading(actions.REGISTER, register),
  takeLeading(actions.RESET_PASSWORD, resetPasword),
  takeLeading(actions.REGISTER_COMPLETE, registerComplete),
  takeLeading(actions.REGISTER_ABORT, registerAbort)
];

function* logout() {
  try {
    const csrf = yield select(commonSelectors.getCSRF);
    const data = {
      method: 'POST',
      headers: { 'x-csrf-token': csrf }
    };
    const result = yield call(fetch, '/logout', data);
    console.log('logout result', result);
    //yield put(actions.removeSessionData()); //necessary becouse of page reload
    window.location.reload();
  } catch (e) {
    error.showError(e.message);
  }
}

function* login(data) {
  try {
    if (!data.username || !data.password) {
      return;
    }
    const csrf = yield select(commonSelectors.getCSRF);
    const payload = {
      method: 'post',
      url: '/login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-csrf-token': csrf
      },
      data: formUrlencoded({
        username: data.username,
        password: data.password,
        remember: 'on',
        _csrf: csrf,
        noscript: false
      })
    };
    const response = yield axiosHandler(axios(payload));
    if (typeof response.data === 'string' && response.data.startsWith('/')) {
      location.replace(response.data);
    } else if (typeof response.data === 'object') {
      //this should be handled without a page reoload
      //server returs an object with new csrf token
      location.replace(response.data.next);
    }
  } catch (e) {
    error.showError(e.message);
  }
}

function* register(data) {
  try {
    const formValues = data.values;
    const csrf = yield select(commonSelectors.getCSRF);
    const payload = {
      method: 'post',
      url: '/register',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-csrf-token': csrf
      },
      data: formUrlencoded({
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
        ['password-confirm']: formValues['password-confirm'],
        noscript: false,
        _csrf: csrf,
        userLang: 'en-US'
      })
    };

    const response = yield axiosHandler(axios(payload));
    if (response.data.referrer) {
      Router.push({ pathname: '/register_complete' }, response.data.referrer);
    }
  } catch (e) {
    error.showError(e.message);
  }
}

function* registerComplete() {
  try {
    const csrf = yield select(commonSelectors.getCSRF);
    const payload = {
      method: 'post',
      url: '/register/complete/?_csrf=' + csrf,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    yield axiosHandler(axios(payload));
    location.replace('/');
  } catch (e) {
    error.showError(e.message);
  }
}

function* registerAbort() {
  try {
    const payload = {
      method: 'post',
      url: '/register/abort',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    yield axiosHandler(axios(payload));
    location.replace('/');
  } catch (e) {
    error.showError(e.message);
  }
}

//422["user.reset.send", "cancel.k.k@gmail.com"]
function* resetPasword({ email }) {
  try {
    yield call(socket.emitAsync, 'user.reset.send', email);
    message.success(translate('reset_password-password_reset_sent'));
  } catch (e) {
    error.showError(e.message);
  }
}
