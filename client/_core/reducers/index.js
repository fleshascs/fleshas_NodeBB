import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import chat from 'areas/chat/reducers';
import forum from 'areas/forum/reducers';
import general from 'areas/general/reducers';
import videoPlayer from 'areas/videoPlayer/reducers';
import drawingBoard from 'areas/drawingBoard/reducers';
import csrf from './csrf';
import users from './users';
import socket from './socket';

const rootReducer = combineReducers({
  authentication,
  chat,
  csrf,
  users,
  forum,
  general,
  socket,
  videoPlayer,
  drawingBoard
});

export default rootReducer;
