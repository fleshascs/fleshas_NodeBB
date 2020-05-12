export const SET_VISIBLE = 'areas/videoPlayer/set_visible';
export const SET_VIDEO = 'areas/videoPlayer/set_video';

export function setVisible(playerVisible) {
  return {
    type: SET_VISIBLE,
    playerVisible
  };
}
export function setVideo(video) {
  return {
    type: SET_VIDEO,
    video
  };
}
