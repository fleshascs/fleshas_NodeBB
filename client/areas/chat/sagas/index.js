import { takeEvery, put, select, call } from 'redux-saga/effects';
import * as actions from '../actions';
import { getChatsOpened } from '../selectors';
import { hasPrivateChat, createChat } from '../services';
import socket from 'areas/socket/services';
import { getUser } from 'areas/session/selectors';
import { error } from '_core/utils';
import { LOGOUT_SUCCESS } from 'areas/session/actions';

export default [
  takeEvery(actions.OPEN_CHAT, openChat),
  takeEvery(actions.CLOSE_CHAT, closeChat),
  takeEvery(actions.START_CONVERSATION, startConversation),
  takeEvery(actions.SEND_MESSAGE, sendMessage),
  takeEvery(LOGOUT_SUCCESS, closeChats)
];

const getLocalStorageKey = (uid) => 'chatsOpened-' + uid;

function* closeChats() {
  yield put(actions.chatsOpened({}));
}

function* sendMessage({ roomId, message, callback }) {
  try {
    const payload = {
      roomId: roomId,
      message: message
    };
    yield call(socket.emitAsync, 'modules.chats.send', payload);
    callback();
  } catch (e) {
    callback(e);
    error.showError(e.message);
  }
}

function* startConversation(data) {
  try {
    if (!data.uid) {
      throw new Error('uid is required');
    }
    let roomId = yield call(hasPrivateChat, data.uid);
    if (!roomId) {
      //const isStatusDnD = yield call(isDnD, data.uid); // show prompt in the future
      roomId = yield call(createChat, data.uid);
    }
    yield put(actions.openChat({ roomId }));
  } catch (e) {
    error.showError(e.message);
  }
}

function* openChat(data) {
  try {
    const user = yield select(getUser);
    const chatsOpened = yield select(getChatsOpened);
    if (!data.chat.roomId) {
      throw new Error('roomId is required');
    }
    chatsOpened[data.chat.roomId] = data.chat;
    yield put(actions.chatsOpened(chatsOpened));
    localStorage.setItem(getLocalStorageKey(user.uid), JSON.stringify(chatsOpened));
  } catch (e) {
    error.showError(e.message);
  }
}

function* closeChat(data) {
  try {
    const user = yield select(getUser);
    const chatsOpened = yield select(getChatsOpened);
    if (!data.chat.roomId) {
      throw new Error('roomId is required');
    }

    delete chatsOpened[data.chat.roomId];
    yield put(actions.chatsOpened(chatsOpened));
    localStorage.setItem(getLocalStorageKey(user.uid), JSON.stringify(chatsOpened));
  } catch (e) {
    error.showError(e.message);
  }
}
