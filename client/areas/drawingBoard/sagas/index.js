import { put, call, fork, spawn, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { toggleBoard } from '../actions';
import { getIsBoardEnabled } from '../utils';
import socket from 'areas/socket/services';

export default [fork(init)];

function* init() {
  try {
    if (typeof window === 'undefined') return;
    yield spawn(watchSocket);
    const { isBoardEnabled } = yield call(getIsBoardEnabled);
    yield put(toggleBoard(isBoardEnabled));
  } catch (error) {
    console.log('failed to fetch getIsBoardEnabled', error);
  }
}

function createChannel() {
  return eventChannel((emitter) => {
    socket.on('event:toggleDrawingBoard', emitter);
    return () => {
      socket.off('event:toggleDrawingBoard', emitter);
    };
  });
}

function* watchSocket() {
  const channel = yield call(createChannel);
  try {
    while (true) {
      const isBoardEnabled = yield take(channel);
      yield put(toggleBoard(isBoardEnabled));
    }
  } finally {
    console.log('toggleDrawingBoard channel terminated');
  }
}
