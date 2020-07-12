import * as actions from '../actions';

const initialState = { playerVisible: false, video: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_VISIBLE: {
      return { ...state, playerVisible: action.playerVisible };
    }
    case actions.SET_VIDEO: {
      if (action.video.createtime) {
        action.video.createtime = parseInt(action.video.createtime);
      }
      if (action.video.startTime) {
        action.video.startTime = parseInt(action.video.startTime);
      }
      return { ...state, video: action.video };
    }
    default:
      return state;
  }
}
