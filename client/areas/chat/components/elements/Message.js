import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import moment from 'moment';
import { Avatar, Username } from 'ui';
import { chatMyMessageColor } from '_theme';
import { getUser } from 'areas/session/selectors';
import './message.css';

const MessageContainer = styled.div`
  display: flex;
`;
const MessageText = styled.div`
  color: #000;
  background: rgb(239, 239, 239);
  margin-left: 5px;
  border-radius: 10px;
  padding: 5px 8px 6px;
  font-size: 13px;

  & p {
    margin: 0px;
    line-height: 25px;
    word-break: break-word;
  }
`;

const MyMessageText = styled(MessageText)`
  background: ${chatMyMessageColor};
  color: #fff;
  & p {
    margin: 0px;
    line-height: 25px;
    word-break: break-word;
  }

  a {
    color: #b5e5ec;
  }
`;

class Message extends Component {
  render() {
    const { user, message, previousSenderSame, secondSenderSame } = this.props;
    let css = '';

    if (previousSenderSame) {
      css += ' previousMsgFromSameSender';
    }
    if (secondSenderSame) {
      css += ' secondMsgFromSameSender';
    }
    function createMarkup() {
      return { __html: message.content };
    }
    if (user.uid == message.fromUser.uid) {
      return (
        <MessageContainer
          className={`${css} ${!previousSenderSame ? 'mt-1' : ''} right`}
          style={{ justifyContent: 'flex-end' }}
        >
          <Tooltip title={moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
            <MyMessageText className={`${css} right`} dangerouslySetInnerHTML={createMarkup()} />
          </Tooltip>
        </MessageContainer>
      );
    }

    //oponento zinute
    return (
      <div className={`${css} left`}>
        <Username user={message.fromUser} className='chat-oponent-name mt-3'>
          {message.fromUser.username}
        </Username>
        {/* <Important className="chat-oponent-name mt-3">
					{message.fromUser.username}
				</Important> */}
        <MessageContainer className={`${css} left`}>
          <div className='chat-oponent-details text-center'>
            <Avatar className='m-auto' imgUrl={message.fromUser.picture} />
          </div>
          <Tooltip title={moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
            <MessageText className={`${css} left`} dangerouslySetInnerHTML={createMarkup()} />
          </Tooltip>
        </MessageContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: getUser(state)
  };
}
export default connect(mapStateToProps)(Message);
