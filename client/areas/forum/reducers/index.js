import * as actions from '../actions';

const initialState = {
  currentPagePosts: [],
  currentPageTopic: {}
};
export default function forum(state = initialState, action) {
  switch (action.type) {
    case actions.CURRENT_PAGE_POSTS: {
      return { ...state, currentPagePosts: action.posts };
    }
    case actions.CURRENT_PAGE_TOPIC: {
      const mergedTopic = Object.assign({}, state.currentPageTopic, action.topic);
      return { ...state, currentPageTopic: mergedTopic };
    }
    default:
      return state;
  }
}
