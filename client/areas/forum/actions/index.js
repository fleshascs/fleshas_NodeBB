export const REPLY = 'areas/forum/reply';
export const DETELE_POST = 'areas/forum/delete_post';
export const EDIT_POST = 'areas/forum/edit_post';
export const CURRENT_PAGE_POSTS = 'areas/forum/current_page_posts';
export const CURRENT_PAGE_TOPIC = 'areas/forum/current_page_topic';
export const RESTORE_POST = 'areas/forum/restore_post';
export const CREATE_TOPIC = 'areas/forum/create_topic';
export const DELETE_TOPIC = 'areas/forum/delete_topic';
export const LOCK_TOPIC = 'areas/forum/lock_topic';
export const PIN_TOPIC = 'areas/forum/pin_topic';

export function pinTopic(topic) {
  return { type: PIN_TOPIC, topic };
}
export function lockTopic(topic) {
  return { type: LOCK_TOPIC, topic };
}
export function deleteTopic(topic) {
  return { type: DELETE_TOPIC, topic };
}
export function createTopic(topic) {
  return { type: CREATE_TOPIC, topic };
}

export function reply(post, successCallback) {
  return { type: REPLY, post, successCallback };
}

export function deletePost(post) {
  return { type: DETELE_POST, post };
}
export function restorePost(post) {
  return { type: RESTORE_POST, post };
}

export function editPost(post, successCallback) {
  return { type: EDIT_POST, post, successCallback };
}

export function setCurrentPagePosts(posts) {
  return { type: CURRENT_PAGE_POSTS, posts };
}

export function setCurrentTopic(topic) {
  return { type: CURRENT_PAGE_TOPIC, topic };
}
