import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Username } from 'ui';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

const MessageWrapper = styled.div`
  width: 100%;
  padding-right: 5px;

  a {
    color: #0089ff;
  }
`;

class Message extends PureComponent {
  messageContent(content, deleted) {
    if (deleted == 1) {
      return 'Message deleted...';
    }
    //remove 'break line' symbol at the end and unwrap from <p> tag
    return content.trim().replace(/^<p[^>]*>|<\/p>$/g, '');
  }

  render() {
    const { user, timestamp, content: rawContent, deleted, friendlyDate } = this.props;
    const content = {
      __html: this.messageContent(rawContent, deleted)
    };

    //user.isMod
    //423["plugins.shoutbox.remove",{"sid":4}]	40
    //42["event:shoutbox.delete",{"sid":4}]
    return (
      <Comment
        className='ml-1'
        //actions={actions}
        author={<Username user={user}>{user.username}</Username>}
        avatar={
          <Avatar
            src={
              user.picture ||
              'http://www.gravatar.com/avatar/ae69fa0d674d490c99c4d8fdca23f1e2?s=100&r=x&d=retro'
            }
            shape='square'
            alt={user.username}
          />
        }
        content={<MessageWrapper dangerouslySetInnerHTML={content} />}
        datetime={
          <Tooltip title={moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{friendlyDate}</span>
          </Tooltip>
        }
      />
    );
  }
}

export default Message;
