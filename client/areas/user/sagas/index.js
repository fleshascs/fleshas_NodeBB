import { put, call, takeLeading, select, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import socket from 'areas/socket/services';
import { message } from 'antd';
import { getOnlineUsersObj } from '../selectors';
import { translate } from '_core/i18n';
import { error } from '_core/utils';

export default [
  takeLeading(actions.UPDATE_USER_DATA, updateUserData),
  takeLeading(actions.UPDATE_USER_EMAIL, updateUserEmail),
  takeLeading(actions.UPDATE_USER_PASSWORD, updateUserPassword),
  takeLeading(actions.UPDATE_USER_PICTURE, updateUserPicture),
  takeLeading(actions.UPDATE_USER_COVER_IMAGE, updateUserCoverImage),
  takeEvery(actions.REMOVE_USER_FROM_ONLINE_LIST, removeFromOnlineList),
  takeEvery(actions.ADD_USER_TO_ONLINE_LIST, addToOnlineList)
];

function* removeFromOnlineList({ user }) {
  const onlineUsers = yield select(getOnlineUsersObj);
  delete onlineUsers[user.uid];
  yield put(actions.setOnlineUsersPure(onlineUsers));
}

function* addToOnlineList({ user }) {
  const onlineUsers = yield select(getOnlineUsersObj);
  onlineUsers[user.uid] = user;
  yield put(actions.setOnlineUsersPure(onlineUsers));
}

// data.request = {
// 	aboutme: 'fghjk About me,,,,,,,',
// 	birthday: '04/05/2006',
// 	fullname: 'kebabas',
// 	//groupTitle: "['administrators']",
// 	location: 'vilno',
// 	signature: '# H1↵## H2↵### H3↵#### H4↵##### H5↵###### H6',
// 	uid: '1',
// 	website: 'http://fleshas.lt',
// };
//http://localhost:4567/user/fleshas-lt/edit
//http://localhost:4567/api/user/fleshas-lt/edit?_=1554064019904
function* updateUserData(data) {
  try {
    yield call(socket.emitAsync, 'user.updateProfile', data.request);
    message.success(translate('profile-succesfuly-updated'));
  } catch (e) {
    error.showError(e.message);
  }
}

//["user.uploadCroppedPicture",{"uid":"1","imageData":"data:image/jpeg;base64,/9"}]
function* updateUserPicture(data) {
  try {
    yield call(socket.emitAsync, 'user.uploadCroppedPicture', data.request);
    message.success(translate('profile-succesfuly-updated'));
    window.location.reload();
  } catch (e) {
    error.showError(e.message);
  }
}

// "user.updateCover"
// imageData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB38A"
// uid: 4
function* updateUserCoverImage(data) {
  try {
    yield call(socket.emitAsync, 'user.updateCover', data.request);
    message.success(translate('profile-succesfuly-updated'));
  } catch (e) {
    error.showError(e.message);
  }
}

//422["user.changeUsernameEmail",{"uid":"1","email":"cancel.k.k@gmail.com","password":"dd123asd"}]
function* updateUserEmail(data) {
  try {
    yield call(socket.emitAsync, 'user.changeUsernameEmail', data.request);
    message.success(translate('profile-succesfuly-updated'));
  } catch (e) {
    error.showError(e.message);
  }
}

//422["user.changePassword",{"currentPassword":"dd123asd","newPassword":"dd123asd","uid":"1"}]
function* updateUserPassword(data) {
  try {
    yield call(socket.emitAsync, 'user.changePassword', data.request);
    message.success(translate('profile-succesfuly-updated'));
    window.location.reload();
  } catch (e) {
    error.showError(e.message);
  }
}
