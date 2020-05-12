import socket from 'areas/socket/services';
import { translate } from '_core/i18n';

export function getMarkdownString(postId) {
  return socket.emitAsync('plugins.composer.push', postId);
}

export async function getAvailableTools(post) {
  if (!post.pid || !post.tid) {
    throw new Error('pid and cid is required');
  }

  const result = await socket.emitAsync('posts.loadPostTools', { pid: post.pid, cid: post.tid });
  const tools = [];
  if (result.canEdit && result.canEdit.flag) {
    tools.push({
      name: translate('edit'),
      index: 'canEdit'
    });
  }
  if (result.canDelete && result.canDelete.flag && !post.deleted) {
    tools.push({
      name: translate('delete'),
      index: 'canDelete'
    });
  }
  if (post.deleted) {
    tools.push({
      name: translate('restore'),
      index: 'canRestore'
    });
  }
  return tools;
}

//423["topics.loadTopicTools",{"tid":14633,"cid":3}]
export async function getAvailableModeratorTools(topic) {
  //console.log('postpostpost', topic);
  if (!topic.tid || !topic.tid) {
    throw new Error('tid and cid is required');
  }

  const result = await socket.emitAsync('topics.loadTopicTools', {
    tid: topic.tid,
    cid: topic.tid
  });
  const tools = [];
  if (result.privileges) {
    if (result.privileges['topics:delete']) {
      tools.push({
        stateIndex: 'deleted',
        stateTexts: ['🗑️ Delete topic', '🗑️ Restore topic'],
        index: 'deleteTopic'
      });
    }
    if (result.privileges['topics:reply']) {
      tools.push({
        stateIndex: 'locked',
        stateTexts: ['🔒 Lock topic', '🔒 Unlock topic'],
        index: 'lockTopic'
      });
    }
    if (result.privileges['topics:reply']) {
      tools.push({
        stateIndex: 'pinned',
        stateTexts: ['📌 Pin to the top', '📌 Unpin from the top'],
        index: 'pinTopic'
      });
    }
  }
  return tools;
}
