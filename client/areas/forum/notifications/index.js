import { notification, Avatar } from 'antd';
import { escapeHTML, buildTopicUrl } from '_core/utils';
import Router from 'next/router';
import { translate } from '_core/i18n';

export function newPosts(data) {
  if (!data.posts.length) return;

  data.posts.map((post) => {
    notification.open({
      message: post.user.username + ' ' + translate('new-post-notification'),
      description: escapeHTML(post.content), // it's always wrapped in <p> tag, we don't want that
      icon: <Avatar shape='square' src={post.user.picture} />,
      onClick: () => handleNotificationClick(post)
    });
  });
}

function handleNotificationClick(post) {
  const route = buildTopicUrl(null, post.topic.slug, post.index + 1);
  Router.push(route.path, route.url);
}
