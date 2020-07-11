import { put, call, fork, spawn, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { setVisible, setVideo } from '../actions';
import { getLatestVideo } from '../utils';
import socket from 'areas/socket/services';

export default [fork(init)];

function* init() {
  try {
    if (typeof window === 'undefined') return;
    yield spawn(watchYoutubeSocket);
    const video = yield call(getLatestVideo);
    if (video?.url) {
      yield put(setVisible(true));
      yield put(setVideo(video));
    }
  } catch (error) {
    console.log('failed to fetch youtube video', error);
  }
}

function createChannel() {
  return eventChannel((emitter) => {
    socket.on('event:playVideo', emitter);
    return () => {
      socket.off('event:playVideo', emitter);
    };
  });
}

function* watchYoutubeSocket() {
  const channel = yield call(createChannel);
  try {
    while (true) {
      const video = yield take(channel);
      yield put(setVisible(true));
      yield put(setVideo(video));
    }
  } finally {
    console.log('playVideo channel terminated');
  }
}
