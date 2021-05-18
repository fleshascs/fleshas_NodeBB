import { all } from 'redux-saga/effects';
import forumSagas from '../areas/forum/sagas';
import chatSagas from '../areas/chat/sagas';
import sessionSagas from '../areas/session/sagas';
import userSagas from '../areas/user/sagas';
import { startStopChannel } from '../areas/socket/sagas';
import videoSagas from '../areas/videoPlayer/sagas';
import drawingBoardSagas from '../areas/drawingBoard/sagas';

export default function* rootSaga() {
  yield all([
    ...forumSagas,
    ...chatSagas,
    ...sessionSagas,
    ...userSagas,
    ...videoSagas,
    ...drawingBoardSagas,
    startStopChannel()
  ]);
}
