import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Comment, Tooltip } from 'antd';
import { Username, Avatar } from 'ui';

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
        avatar={<Avatar user={user} imgUrl={user.picture} showIndicator={true} />}
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
