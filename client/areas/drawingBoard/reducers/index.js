import * as actions from '../actions';

const initialState = { isBoardEnabled: false };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_BOARD: {
      return { ...state, isBoardEnabled: action.isBoardEnabled };
    }
    default:
      return state;
  }
}
