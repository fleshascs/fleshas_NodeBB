import socket from 'areas/socket/services';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import Router from 'next/router';
import { message } from 'antd';
import * as actions from '../actions';
import { buildTopicUrl, error } from '_core/utils';
import { translate } from '_core/i18n';
import { getCurrentPagePosts } from '../selectors';

export default [
  takeEvery(actions.DELETE_TOPIC, deleteTopic),
  takeEvery(actions.PIN_TOPIC, pinTopic),
  takeEvery(actions.LOCK_TOPIC, lockTopic),
  takeEvery(actions.EDIT_POST, editPost),
  takeEvery(actions.REPLY, reply),
  takeEvery(actions.DETELE_POST, deletePost),
  takeEvery(actions.RESTORE_POST, restorePost),
  takeEvery(actions.CREATE_TOPIC, createTopic)
];

function* deleteTopic(data) {
  //424["topics.delete",{"tids":[14670],"cid":2}]
  //42["event:topic_deleted",{"tid":14670,"cid":2,"isDelete":true,"uid":1}]

  // 	425["topics.restore",{"tids":[14670],"cid":2}]	46
  // 22:47:07.107
  // 42["event:topic_restored",{"tid":14670,"cid":2,"isDelete":false,"uid":1}]
  try {
    const payload = {
      tids: [data.topic.tid],
      cid: data.topic.cid
    };
    yield call(socket.emitAsync, data.topic.deleted ? 'topics.restore' : 'topics.delete', payload);
  } catch (e) {
    error.showError(e.message);
  }
}

//42["topics.pin",{"tids":[4192],"cid":2}]
//42["topics.unpin",{"tids":[4192],"cid":2}]
function* pinTopic(data) {
  try {
    const payload = {
      tids: [data.topic.tid],
      cid: data.topic.cid
    };
    yield call(socket.emitAsync, data.topic.pinned ? 'topics.unpin' : 'topics.pin', payload);
  } catch (e) {
    error.showError(e.message);
  }
}

//42["topics.lock",{"tids":[4192],"cid":2}]
//42["topics.unlock",{"tids":[6960],"cid":3}]
function* lockTopic(data) {
  try {
    const payload = {
      tids: [data.topic.tid],
      cid: data.topic.cid
    };
    yield call(socket.emitAsync, data.topic.locked ? 'topics.unlock' : 'topics.lock', payload);
  } catch (e) {
    error.showError(e.message);
  }
}

//["topics.post",{"title":"345345345345345345345345345345345345345","content":"345345345345345345345345345345345345345","thumb":"","cid":2,"tags":[]}]
//export const socketCreateTopic = ({ title, content, thumb, cid, tags }) => {
function* createTopic(data) {
  try {
    if (!data.topic.title || !data.topic.content || !data.topic.cid) {
      message.warning(translate('all-fields-required'));
      return;
    }
    const response = yield call(socket.emitAsync, 'topics.post', data.topic);
    const route = buildTopicUrl(null, response.slug);
    Router.push(route.path, route.url);
  } catch (e) {
    error.showError(e.message);
  }
}

function* deletePost(data) {
  try {
    const posts = yield select(getCurrentPagePosts);
    const post = posts.find((post) => post.pid === data.post.pid);
    if (!post.pid) {
      throw new Error('post with pid ' + data.post.pid + " doesn't exist");
    }
    yield call(socket.emitAsync, 'posts.delete', data.post);
    post.deleted = true;
    yield put(actions.setCurrentPagePosts(posts));
    message.success(translate('post-succesfuly-deleted'));
  } catch (e) {
    error.showError(e.message);
  }
}

function* restorePost(data) {
  try {
    const posts = yield select(getCurrentPagePosts);
    const post = posts.find((post) => post.pid === data.post.pid);
    if (!post.pid) {
      throw new Error('post with pid ' + data.post.pid + " doesn't exist");
    }
    yield call(socket.emitAsync, 'posts.restore', data.post);
    post.deleted = false;
    yield put(actions.setCurrentPagePosts(posts));
    message.success(translate('post-succesfuly-restored'));
  } catch (e) {
    error.showError(e.message);
  }
}

function* reply({ post, successCallback }) {
  try {
    if (!post.tid || !post.content) {
      throw new Error('tid and content required');
    }

    var post = {
      tid: post.tid,
      handle: undefined,
      content: post.content,
      toPid: 1
    };

    const response = yield call(socket.emitAsync, 'posts.reply', post);
    if (!response) {
      throw response;
    }

    const route = buildTopicUrl(null, response.topic.slug, response.index + 1);
    Router.push(route.path, route.url);
    successCallback();
  } catch (e) {
    error.showError(e.message);
  }
}

function* editPost(data) {
  try {
    if (!data.post.pid || !data.post.content) {
      throw new Error('pid and content required');
    }
    const response = yield call(socket.emitAsync, 'posts.edit', data.post);
    const posts = yield select(getCurrentPagePosts);
    const post = posts.find((p) => p.pid === data.post.pid);
    if (!post.pid) {
      throw new Error('post with pid ' + data.post.pid + " doesn't exist");
    }
    post.content = response.content;
    yield put(actions.setCurrentPagePosts(posts));
    data.successCallback();
    message.success(translate('post-succesfuly-changed'));
  } catch (e) {
    error.showError(e.message);
  }
}
